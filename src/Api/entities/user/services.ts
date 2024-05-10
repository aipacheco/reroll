import e from "express"
import { UserFile, Image, UserUpdate } from "../../types"
import * as Repository from "./repository"
import { v2 as cloudinary } from "cloudinary"
import { UploadApiResponse } from "cloudinary"

export const getProfile = async (username: string) => {
  const { data, error } = await Repository.getProfile(username)
  if (error) {
    return { error }
  }
  return { data }
}

export const updateProfile = async (
  body: UserUpdate,
  username: string,
  files: UserFile
) => {
//   console.log(body)
  const { description} = body
  const { avatar } = files
  const uploadImage = async (image: Image) => {
    let resultUrl = ""
    if (image) {
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto", folder: "reroll" },
            (error, result) => {
              if (error) reject(error)
              else if (result && result.url) {
                resultUrl = result.url
                resolve(resultUrl)
              }
            }
          )
          .end(image.buffer)
      })
    }
    return resultUrl
  }
  let avatarUrl
  if (avatar && Array.isArray(avatar) && avatar.length > 0) {
    avatarUrl = await uploadImage(avatar[0])
  }
  const { data, error } = await Repository.updateProfile(
    username,
    description,
    avatarUrl as string
  )
  if (error) {
    return { error }
  }
  return { data }
}

export const getAllUsers = async () => {
  const { data, error } = await Repository.getAllUsers()
  if (error) {
    return { error }
  }
  return { data }
}
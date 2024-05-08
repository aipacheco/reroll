import { Files, GameData, Image } from "../../types"
import { v2 as cloudinary } from "cloudinary"
import * as Repository from "./repository"

export const createGame = async (
  body: GameData,
  userId: number,
  files: Files
) => {
  // console.log("en services", body, files)
  const { name, description, playersMin, playersMax, price, category } = body
  const { image1, image2, image3 } = files

  // console.log(files)

  const uploadImage = async (image: Image[]) => {
    let resultUrl = ""
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
        .end(image[0].buffer)
    })
    return resultUrl
  }

  const [image1Url, image2Url, image3Url] = await Promise.all([
    uploadImage(image1),
    uploadImage(image2),
    uploadImage(image3),
  ])

  try {
    const { data, error } = await Repository.createGame(
      userId,
      name,
      description,
      playersMin,
      playersMax,
      price,
      category,
      image1Url,
      image2Url,
      image3Url
    )
    if (error) {
      return { error }
    }
    return { data }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}
export const getSingleGame = async (id: string) => {
  const { data, error } = await Repository.getSingleGame(id)
  if (error) {
    return { error }
  }
  return { data }
}

export const getAllGames = async () => {
  const { data, error } = await Repository.getAllGames()
  if (error) {
    return { error }
  }
  return { data }
}

export const updateGame = async (
  id: string,
  body: GameData,
  files: Files,
  userId: number
) => {
  const { name, description, playersMin, playersMax, price, category } = body
  let { image1, image2, image3 } = files
    ? files
    : { image1: null, image2: null, image3: null }

    const uploadImage = async (image: Image[] | null) => {
      if (!image) return null
      let resultUrl = ""
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
          .end(image[0].buffer)
      })
      return resultUrl
    }

  const [image1Url, image2Url, image3Url] = await Promise.all([
    uploadImage(image1),
    uploadImage(image2),
    uploadImage(image3),
  ])

  const { data, error } = await Repository.updateGame(
    id,
    userId,
    name,
    description,
    playersMin,
    playersMax,
    price,
    category,
    image1Url,
    image2Url,
    image3Url
  )
  if (error) {
    return { error }
  }
  return { data }
}

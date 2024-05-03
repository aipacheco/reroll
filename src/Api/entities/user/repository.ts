import e from "express"
import Game from "../game/model"
import User from "./model"

export const getProfile = async (username: string) => {
  const userProfile = await User.findOne({ username }).select("-password")
  if (!userProfile) {
    return { error: "El usuario no existe" }
  }
  const userGames = await Game.find({
    author: userProfile._id,
  })
  const profileWithGames = {
    ...userProfile.toObject(),
    games: userGames,
  }
  return { data: profileWithGames }
}

export const updateProfile = async (
  username: string,
  description: string,
  avatarUrl: string
) => {
  const userProfile = await User.findOne({ username })
  if (!userProfile) {
    return { error: "El usuario no existe" }
  }
  const profileToUpdate = {
    description,
    avatar: avatarUrl,
  }
  const updatedProfile = await User.findOneAndUpdate(
    { username },
    profileToUpdate,
    { new: true }
  )
  // console.log("en repository",updatedProfile)
  return { data: updatedProfile }
}

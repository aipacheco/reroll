import Game from "../game/model"
import User from "./model"
import Address from "../address/model"
import { startSession } from "mongoose"

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

export const getAllUsers = async () => {
  const allUsers = await User.find().select("-password")
  if (!allUsers) {
    return { error: "No hay usuarios" }
  }
  return { data: allUsers }
}

export const deleteUser = async (id: string) => {
  const session = await startSession()
  session.startTransaction()
  try {
    const userToDelete = await User.findByIdAndDelete(id, { session })
    if (userToDelete?.role === "admin") {
      throw new Error("No puedes borrar a un administrador")
    }
    if (!userToDelete) {
      throw new Error("El usuario no existe")
    } else {
      await Game.deleteMany({ author: id }, { session })
      await Address.deleteMany({ owner: id }, { session })
    }
    await session.commitTransaction()
    return { data: userToDelete }
  } catch (error) {
    await session.abortTransaction()
    if (error instanceof Error) {
      return { error: error.message }
    } else {
      return { error: "Se produjo un error desconocido" }
    }
  } finally {
    session.endSession()
  }
}

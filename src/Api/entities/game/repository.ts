import User from "../user/model"
import Game from "./model"
import { ObjectId } from "mongoose"

export const createGame = async (
  userId: number,
  name: string,
  description: string,
  playersMin: number,
  playersMax: number,
  price: number,
  category: ObjectId,
  image1: string,
  image2: string,
  image3: string
) => {
  const newGame = await Game.create({
    author: userId,
    name: name,
    description: description,
    playersMin: playersMin,
    playersMax: playersMax,
    price: price,
    category: category,
    image1: image1,
    image2: image2,
    image3: image3,
  })
  const sellerEmail = await User.findById(userId).select("email")

  if (!newGame) {
    return { error: "Error" }
  }

  return { data: newGame, userEmail: sellerEmail?.email }
}
export const getSingleGame = async (id: string) => {
  const game = await Game.findById(id).populate("author", "username")
  if (!game) {
    return { error: "Juego no encontrado" }
  }
  // console.log(game)
  return { data: game }
}

export const getAllGames = async () => {
  const games = await Game.find().populate("author", "username")
  if (!games) {
    return { error: "Juegos no encontrados" }
  }
  return { data: games }
}

export const updateGame = async (
  id: string,
  userId: number,
  name: string,
  description: string,
  playersMin: number,
  playersMax: number,
  price: number,
  category: ObjectId,
  image1Url: string | null,
  image2Url: string | null,
  image3Url: string | null
) => {
  const game = await Game.findById(id)
  if (!game) {
    throw new Error("Game not found")
  }

  const updatedGame = await Game.findOneAndUpdate(
    { _id: id, author: userId },
    {
      name: name,
      description: description,
      playersMin: playersMin,
      playersMax: playersMax,
      price: price,
      category: category,
      image1: image1Url !== null ? image1Url : game.image1,
      image2: image2Url !== null ? image2Url : game.image2,
      image3: image3Url !== null ? image3Url : game.image3,
    },
    { new: true }
  )
  if (!updatedGame) {
    return {
      error: "Juego no encontrado o no tienes permiso para actualizarlo",
    }
  }

  return { data: updatedGame }
}

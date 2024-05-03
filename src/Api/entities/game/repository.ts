import Game from "./model"
import { ObjectId } from "mongoose"

export const createGame = async (
  userId : number,
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
    image3: image3
  })

  if (!newGame) {
    return { error: "Error" }
  }

  return { data: newGame }
}
export const getSingleGame = async (id: string) => {
  const game = await Game.findById(id).populate('author', 'username')
  if (!game) {
    return { error: "Game not found" }
  }
  // console.log(game)
  return { data: game }
}
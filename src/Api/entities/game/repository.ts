import Game from "./model"
import { ObjectId } from "mongoose"

export const createGame = async (
  name: string,
  playersMin: number,
  playersMax: number,
  category: ObjectId,
  images: string[]
  //añadir el id del usuario que hace la venta
) => {
  const newGame = await Game.create({
    name: name,
    playersMin: playersMin,
    playersMax: playersMax,
    category: category,
    images: images,
  })

  if (!newGame) {
    return { error: "Error" }
  }

  return { data: newGame }
}

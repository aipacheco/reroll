import { ObjectId } from "mongoose"
import { TransactionData } from "../../types"
import Transaction from "./model"
import { a } from "../../../../.history/src/Api/types/index.d_20240504115148"
import Game from "../game/model"

export const createTransaction = async (
  body: TransactionData,
  buyerId: number
) => {
  try {
    const seller = await Game.findById(body.game).select("author")
    if (!seller) {
      return { error: "El juego no existe" }
    }
    const findPrice = await Game.findById(body.game).select("price")
    const transaction = new Transaction({
      seller: seller,
      price: findPrice?.price,
      buyer: buyerId,
    })
    const data = await transaction.save()
    return { data: data }
  } catch (error) {
    return { error: error }
  }
}

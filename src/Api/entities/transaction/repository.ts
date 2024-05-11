import { TransactionData } from "../../types"
import Transaction from "./model"
import Game from "../game/model"
import User from "../user/model"
import Address from "../address/model"

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

    const buyerAdress = await Address.findById(body.address)
    const gameName = await Game.findById(body.game).select("name")

    const sellerEmail = await User.findById(seller.author).select("email")

    const transaction = new Transaction({
      seller: seller,
      price: findPrice?.price,
      buyer: buyerId,
    })
    const data = await transaction.save()
    return {
      data: data,
      sellerEmail: sellerEmail?.email,
      buyerAdress: buyerAdress,
      gameName: gameName?.name,
    }
  } catch (error) {
    return { error: error }
  }
}

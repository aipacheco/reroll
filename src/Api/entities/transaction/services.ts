import * as Repository from "./repository"
import { TransactionData } from "../../types"

export const createTransaction = async (
  body: TransactionData,
  buyerId: number
) => {
  try {
    const { data, error } = await Repository.createTransaction(body, buyerId)
    if (error) {
      return { error }
    }
    return { data }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}

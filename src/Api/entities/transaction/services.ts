import * as Repository from "./repository"
import { AddressData, TransactionData } from "../../types"
import { sendEmailToSeller } from "./utils"
// import { sendEmailToSeller } from "./utils"

export const createTransaction = async (
  body: TransactionData,
  buyerId: number
) => {
  try {
    const { data, sellerEmail, buyerAdress, error, gameName } =
      await Repository.createTransaction(body, buyerId)
    if (error) {
      return { error }
    }
    const emailResult = await sendEmailToSeller(
      sellerEmail as string,
      buyerAdress as unknown as AddressData,
      gameName as string
    )
    if (emailResult?.error) {
      console.log("Error al enviar el correo electrónico:", emailResult.error)
      return { error: emailResult.error }
    }

    return { data }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}

import { AddressData } from "../../types"

const mailjet = require("node-mailjet").apiConnect(
  process.env.MAIL_API_KEY,
  process.env.MAIL_API_SECRET
)

export const sendEmailToSeller = async (
  sellerEmail: string,
  buyerAddress: AddressData,
  gamename: string
) => {
  // console.log(buyerAddress)
  // console.log(gamename)
  const { name, lastName, streetAddress, city, province, cp } = buyerAddress
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "rerollgamesales@gmail.com",
          },
          To: [
            {
              Email: sellerEmail,
            },
          ],
          Subject: `Has realizado una venta en Reroll! Has vendido ${gamename}`,
          TextPart: `Has vendido ${gamename} a ${name} ${lastName} en la dirección ${streetAddress}, ${city}, ${province}, ${cp}`,
        },
      ],
    })
    console.log(request.body)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return { error: error.message }
    }
  }
}

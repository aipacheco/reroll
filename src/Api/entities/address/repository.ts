import { AddressData } from "../../types"
import User from "../user/model"
import Address from "./model"

export const createAddress = async (body: AddressData, userId: number) => {
  const ID = await User.findById(userId)
  const { name, lastName, streetAddress, city, province, cp } = body
  if (!ID) {
    return { error: "Usuario no encontrado" }
  }
  const newAddress = await Address.create({
    owner: userId,
    name,
    lastName,
    streetAddress,
    city,
    province,
    cp,
  })
  return { data: newAddress }
}

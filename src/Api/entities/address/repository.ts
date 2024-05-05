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

export const getAddressByUser = async (userId: number) => {
  const ID = await User.findById(userId)
  if (!ID) {
    return { error: "Usuario no encontrado" }
  }
  const userAddress = await Address.find({ owner: userId }).exec()
  return { data: userAddress }
}

export const getAddressById = async (id: string) => {
  const address = await Address.findById(id).exec()
  if (!address) {
    return { error: "Dirección no encontrada" }
  }
  return { data: address }
}

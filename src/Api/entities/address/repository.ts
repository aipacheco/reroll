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

export const updateAddress = async (
  id: string,
  body: AddressData,
  userId: number
) => {
  const { name, lastName, streetAddress, city, province, cp } = body
  const address = await Address.findOne({ _id: id, owner: userId }).exec()
  if (!address) {
    return {
      error: "Dirección no encontrada o no tienes permiso para actualizarla",
    }
  }
  address.name = name
  address.lastName = lastName
  address.streetAddress = streetAddress
  address.city = city
  address.province = province
  address.cp = cp

  const updatedAddress = await address.save()
  return { data: updatedAddress }
}

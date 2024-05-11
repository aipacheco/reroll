import { AddressData } from "../../types"
import * as Repository from "./repository"
import { validator } from "./utils"
export const createAddress = async (body: AddressData, userId: number) => {
  const invalidAddress = validator(body, "address")
  if (invalidAddress) {
    return { error: invalidAddress }
  } else {
    const { data, error } = await Repository.createAddress(body, userId)
    if (error) {
      return { error }
    }
    return { data }
  }
}

export const getAddressByUser = async (userId: number) => {
  const { data, error } = await Repository.getAddressByUser(userId)
  if (error) {
    return { error }
  }
  return { data }
}

export const getAddressById = async (id: string) => {
  const { data, error } = await Repository.getAddressById(id)
  if (error) {
    return { error }
  }
  return { data }
}

export const updateAddress = async (
  id: string,
  body: AddressData,
  userId: number
) => {
  const invalidAddress = validator(body, "address")
  if (invalidAddress) {
    return { error: invalidAddress }
  } else {
    const { data, error } = await Repository.updateAddress(id, body, userId)
    if (error) {
      return { error }
    }
    return { data }
  }
}

export const deleteAddress = async (id: string, userId: number) => {
  const { data, error } = await Repository.deleteAddress(id, userId)
  if (error) {
    return { error }
  }
  return { data }
}

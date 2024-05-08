import { AddressData } from "../../types"
import * as Repository from "./repository"

export const createAddress = async (body: AddressData, userId: number) => {
  const { data, error } = await Repository.createAddress(body, userId)
  if (error) {
    return { error }
  }
  return { data }
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
export const updateAddress = async (id: string, body: AddressData, userId:number) => {
  console.log(id)
  const { data, error } = await Repository.updateAddress(id, body, userId)
  if (error) {
    return { error }
  }
  return { data }
}

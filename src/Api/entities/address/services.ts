import { AddressData } from "../../types"
import * as Repository from "./repository"

export const createAddress = async (body: AddressData, userId: number) => {
    const { data, error } = await Repository.createAddress(body, userId)
    if (error) {
        return { error }
    }
    return { data }
    }

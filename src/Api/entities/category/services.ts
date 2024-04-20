import { GameData } from "../../types"
import * as Repository from "./repository"
import { validName } from "./utils"

export const createCategory = async (body: GameData) => {
  const categoryErrors = validName(body)
    //chequear que categoryErrors no contenga nada, si contiene algo se devuelve un ERROR a Controller
  console.log(categoryErrors)
  const { name } = body
  const newCategory = await Repository.createCategory(name)
  return newCategory
}

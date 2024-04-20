import { GameData } from "../../types"
import * as Repository from "./repository"
import { validName } from "./utils"

export const createCategory = async (body: GameData) => {
  const categoryErrors = validName(body)
  const { invalid } = categoryErrors
if(invalid){
  return {error: "Datos de creación no válidos", details: categoryErrors}
}
  const { name } = body
  const{ data, error} = await Repository.createCategory(name)
  if (error) {
    return { error }
  }
  return { data }

}

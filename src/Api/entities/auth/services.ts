import { UserData } from "../../types"
import { validateUser } from "./utils"
import * as Repository from "./repository"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const register = async (body: UserData) => {
  const userErrors = validateUser(body)
  const { username, email, password } = body
  const passEncript: string = bcrypt.hashSync(password, 12)
  const newUser = {
    username,
    email,
    password: passEncript,
  }
  const user = await Repository.register(newUser)
  return user
}

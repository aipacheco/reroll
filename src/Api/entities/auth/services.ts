import { UserData } from "../../types"
import { validateUser } from "./utils"
import * as Repository from "./repository"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const register = async (body: UserData) => {
  const userErrors = validateUser(body)
  //comprobar que no contenga nada, si contiene algo mandar error 
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

export const login = async (body: UserData) => {
  const { email, password } = body
  const { user, error } = await Repository.login(email)
  if (error) {
    return { error: error }
  }
  if (user) {
    const hashedPassword = user.password
    if (typeof hashedPassword === "string") {
      const isValidPassword = bcrypt.compareSync(password, hashedPassword)
      if (isValidPassword) {
        const token = Jwt.sign(
          {
            userId: user._id,
            role: user.role,
            username: user.username,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "730h",
          }
        )
        return { token: token }
      } else {
        return { error: "Contraseña incorrecta" }
      }
    }
  }
}

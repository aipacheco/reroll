import { UserData } from "../../types"
import { validateUser } from "./utils"
import * as Repository from "./repository"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const register = async (body: UserData) => {
  // console.log(body)
  const userErrors = validateUser(body)
  const { requiredLength, isInvalidPassword, isInvalidEmail } = userErrors
  if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
    const { username, email, password } = body
    const passEncript: string = bcrypt.hashSync(password, 12)
    const newUser = {
      username,
      email,
      password: passEncript,
    }
    try {
    const { user, error } = await Repository.register(newUser)
    console.log(user, error, "en services")
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: error,
    //   })
    // }

    // if (user) {
    //   //se crea para devolver el user sin password hasheado
    //   const userToReturn = {
    //     username: user.username,
    //     email: user.email,
    //   }

    //   return res.status(201).json({
    //     success: true,
    //     message: "User created",
    //     data: userToReturn,
    //   })
    
  } catch (error) {
    // return res.status(500).json({
    //   success: false,
    //   message: error,
    // })
  }
  }
  
}

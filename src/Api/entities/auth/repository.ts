import { UserData } from "../../types"
import User from "../user/model"

export const register = async (newUser: UserData) => {
  const userFind = await User.findOne({ email: newUser.email }).exec()
  if (userFind) {
    return { error: "Email ya en uso" }
  }
  const findUsername = await User.findOne({ username: newUser.username }).exec()
  if (findUsername) {
    return { error: "Nombre de usuario ya en uso" }
  }
  const userCreated = await User.create(newUser)
  return { data: userCreated }
}

export const login = async (email: string) => {
  const findEmail = await User.findOne({ email: email })
    .select("+password")
    .select("+role")
    .exec()
  if (!findEmail) {
    return { error: "Email no encontrado" }
  }
  // if (!findEmail.isActive) {
  //   return { error: "Usuario inactivo" }
  // }
  return { user: findEmail }
}

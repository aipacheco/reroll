import { UserData } from "../../types"
import User from "../user/model"

// export const existentEmail = async (user: UserData) => {
//   const userFind = await User.findOne({ email: user.email }).exec()
//   if (userFind) {
//     return { error: "Email ya en uso" }
//   }
// }
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
  return { user: userCreated }
}

export const login = async () => {}

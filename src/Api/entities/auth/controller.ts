import { Request, Response } from "express"
import * as Service from "./services"

export const register = async (request: Request, response: Response) => {
  const { body } = request
  const { username, email, password } = body
  if (!username || !email || !password) {
    return response.status(400).json({
      success: false,
      message: "Debe introducir todos los datos",
    })
  } else {
    const user = await Service.register(body)
    console.log(user, " en controller")
    return response.status(201).json({
      data: user,
      message: "Usuario creado correctamente"
    })
  }
}

export const login = async (request: Request, response: Response) => {}

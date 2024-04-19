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
  }
  try {
    const { user, error } = await Service.register(body)
    if (user) {
      const userToReturn = {
        username: user.username,
        email: user.email,
      }
      return response.status(201).json({
        data: userToReturn,
        message: "Usuario creado correctamente",
      })
    }
    if (error) {
      return response.status(400).json({
        data: user,
        message: error,
      })
    }
  } catch (error) {
    return response.status(500).json({
      message: error,
    })
  }
}

export const login = async (request: Request, response: Response) => {}

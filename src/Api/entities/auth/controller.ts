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
        success: true,
        data: userToReturn,
        message: "Usuario creado correctamente",
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        data: user,
        message: error,
      })
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const login = async (request: Request, response: Response) => {
  const { body } = request
  const { email, password } = body
  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Debe introducir todos los datos",
    })
  }
  try {
    const data = await Service.login(body)
    // const {token, error} = data
    // console.log("en controller ", data)
    if (data?.token) {
      return response.status(201).json({
        success: true,
        message: "Login correcto",
        token: data?.token,
      })
    }
    if (data?.error) {
      return response.status(400).json({
        success: false,
        message: data?.error,
      })
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error,
    })
  }
}

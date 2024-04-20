import { Request, Response } from "express"
import * as Service from "./services"

export const register = async (request: Request, response: Response) => {
  const { body } = request
  try {
    const { data, error, details } = await Service.register(body)
    if (error) {
      return response.status(400).json({
        success: false,
        message: error,
        details,
      })
    }
    return response.status(201).json({
      success: true,
      data,
      message: "Usuario creado correctamente",
    })
  } catch (error) {
    // Manejo de posibles errores inesperados
    return response.status(500).json({
      success: false,
      message: "Error interno del servidor",
      details: error instanceof Error ? error.message : error,
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

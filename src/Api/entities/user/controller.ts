import { Request, Response } from "express"
import * as Services from "./services"

export const getProfile = async (request: Request, response: Response) => {
  try {
    const { data, error } = await Services.getProfile()
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: "El usuario no existe",
        error: error,
      })
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Error interno del servidor",
      details: error instanceof Error ? error.message : error,
    })
  }
}

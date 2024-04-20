import { Request, Response } from "express"
import * as Services from "./services"

export const createCategory = async (request: Request, response: Response) => {
  const { body } = request
  try {
    const { data, error, details } = await Services.createCategory(body)
    if (data) {
      return response.status(201).json({
        success: true,
        data,
        message: "Categoría creada correctamente",
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        //para devolver solo el mensaje accediendo directamente a invalid
        message: details?.invalid,
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

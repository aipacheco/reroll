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
        /*para devolver solo el mensaje accediendo directamente a invalid
        porque se ha creado así en services*/
        message: details?.invalid,
        error:error
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
export const getAllCategories = async (request: Request, response: Response) => {

  try {
    const { data, error } = await Services.getAllCategories()
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: "no existen categorías",
        error:error
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

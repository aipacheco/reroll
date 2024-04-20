import { Request, Response } from "express"
import * as Services from "./services"

export const createCategory = async (request: Request, response: Response) => {
  const { body } = request
  try {
    const { category, error } = await Services.createCategory(body)
    if (category) {
      return response.status(201).json({
        success: true,
        data: category,
        message: "Categoría creada correctamente",
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        data: category,
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

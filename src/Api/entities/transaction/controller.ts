import { Request, Response } from "express"
import * as Service from "./services"

export const createTransaction = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.tokenData
  const { body } = request
  try {
    const { data, error } = await Service.createTransaction(body, userId)
    if (error) {
      return response.status(400).json({
        success: false,
        message: error,
      })
    }
    if (data) {
      return response.status(201).json({
        success: true,
        data,
        message: "Transacción creada correctamente",
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

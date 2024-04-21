import { Request, Response } from "express"
import * as Service from "./services"
import { Files } from "../../types"
import { constants } from "fs/promises"

export const createGame = async (request: Request, response: Response) => {
  //   console.log("el body",request.body,"las files", request.files)
  const { body } = request
  const files = request.files as Files
  try {
    const { data, error } = await Service.createGame(body, files)
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
        message: "Anuncio creado correctamente",
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

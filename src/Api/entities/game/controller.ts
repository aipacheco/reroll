import { Request, Response } from "express"
import * as Service from "./services"
import { Files } from "../../types"

export const createGame = async (request: Request, response: Response) => {
  // console.log("las files", request.files)
  const { userId } = request.tokenData
  const { body } = request
  const files = request.files as Files
  if (files) {
    try {
      const { data, error } = await Service.createGame(body,userId, files)
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
}

export const getSingleGame = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const { data, error } = await Service.getSingleGame(id)
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: "El juego no existe",
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
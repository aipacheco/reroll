import { Request, Response } from "express"
import * as Service from "./services"

export const createAddress = async (request: Request, response: Response) => {
  const { body } = request
  const { userId } = request.tokenData
  try {
    const { data, error } = await Service.createAddress(body, userId)
    if (data) {
      return response.status(201).json({
        success: true,
        data,
        message: "Dirección creada correctamente",
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: error,
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

export const getAddressByUser = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.tokenData
  try {
    const { data, error } = await Service.getAddressByUser(userId)
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: error,
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

export const getAddressById = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    const { data, error } = await Service.getAddressById(id)
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: error,
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

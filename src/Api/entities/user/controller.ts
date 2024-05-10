import e, { Request, Response } from "express"
import * as Services from "./services"
import { UserFile } from "../../types"

export const getProfile = async (request: Request, response: Response) => {
  const {username} = request.params
  try {
    const { data, error } = await Services.getProfile(username)
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

export const updateProfile = async (request: Request, response: Response) => {
  const { username } = request.params
  const { body } = request
  const files = request.files as UserFile
  // console.log(body, userId, files)
  if (files) {
    try {
      const { data, error } = await Services.updateProfile(body,username, files)
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
          message: "Usuario modificado correctamente",
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

export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const { data, error } = await Services.getAllUsers()
    if (data) {
      return response.status(200).json({
        success: true,
        data,
      })
    }
    if (error) {
      return response.status(400).json({
        success: false,
        message: "No se han podido obtener los usuarios",
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

import { ObjectId } from "mongoose"

export type TokenData = {
  userId: number
  role: string
}

export type UserData = {
  username?: string
  email: string
  password: string
}

export type GameData = {
  name: string
  playersMin: number
  playersMax: number
  category: ObjectId
}

export type Files = {
  images: Express.Multer.File[]
}
export type DataOrError ={
  data?: object
  error?: string
}
declare global {
  // Express
  namespace Express {
    export interface Request {
      tokenData: TokenData
    }
  }
}

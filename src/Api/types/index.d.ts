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
  description: string
  playersMin: number
  playersMax: number
  price: number
  category: ObjectId
}

export type Files = {
  image1: Express.Multer.File[]
  image2: Express.Multer.File[]
  image3: Express.Multer.File[]
}

interface Image {
  path: string;
}

export type DataOrError = {
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

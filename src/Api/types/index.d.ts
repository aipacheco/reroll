import { ObjectId } from "mongoose"
import { ty } from '../../../.history/src/Api/types/index.d_20240502095532';

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

export type UserUpdate ={
  description: string
}
export type AddressData = {
  owner: ObjectId
  name: string
  lastName: string
  streetAddress: string
  city: string
  province: string
  cp: number
}
export type Files = {
  image1: Express.Multer.File[]
  image2: Express.Multer.File[]
  image3: Express.Multer.File[]
}

export type UserFile = {
  avatar: Express.Multer.File[]
}


export type  Image = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
  length?: number
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

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
}
declare global {
  // Express
  namespace Express {
    export interface Request {
      tokenData: TokenData
    }
  }
}

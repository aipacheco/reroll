export type TokenData = {
    userId: number
    role: string
  }
  
  declare global {
    // Express
    namespace Express {
      export interface Request {
        tokenData: TokenData
      }
    }
  }
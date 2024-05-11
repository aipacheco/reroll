import express from "express"
import * as Controller from "./controller"

const authRouter = express.Router()

authRouter.post("/register", Controller.register)
authRouter.post("/login", Controller.login)

export default authRouter

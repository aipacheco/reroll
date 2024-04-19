import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"

const authRouter = express.Router()

authRouter.post("/register", Controller.register)
authRouter.post("/login", Controller.login)

export default authRouter

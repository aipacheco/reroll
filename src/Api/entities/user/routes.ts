import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"

const userRouter = express.Router()

userRouter.get("/:username", auth, Controller.getProfile)

export default userRouter
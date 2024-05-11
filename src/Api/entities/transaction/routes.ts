import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"

const transactionRouter = express.Router()

transactionRouter.post("/", auth, Controller.createTransaction)

export default transactionRouter
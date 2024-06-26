import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"

const categoryRouter = express.Router()

categoryRouter.post("/", auth, isAdmin, Controller.createCategory)
categoryRouter.get("/", Controller.getAllCategories)


export default categoryRouter
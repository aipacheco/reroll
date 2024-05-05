import express, { Router } from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"

const addressRouter = express.Router()

addressRouter.post("/", auth,  Controller.createAddress)
addressRouter.get("/", auth,  Controller.getAddressByUser)
addressRouter.get("/:id", auth,  Controller.getAddressById)


export default addressRouter
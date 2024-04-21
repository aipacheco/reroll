import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const gameRouter = express.Router()

gameRouter.post("/", upload.fields([{ name: 'name', maxCount: 1 },{ name: 'playersMin', maxCount: 1 },{ name: 'playersMax', maxCount: 1 }, { name: 'images', maxCount: 3 }]),Controller.createGame)

export default gameRouter
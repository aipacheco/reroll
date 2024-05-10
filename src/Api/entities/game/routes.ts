import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const gameRouter = express.Router()

gameRouter.post(
  "/",
  upload.fields([
    { name: "name", maxCount: 1 },
    { name: "description", maxCount: 1 },
    { name: "playersMin", maxCount: 1 },
    { name: "playersMax", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "price", maxCount: 1 },
  ]),
  auth,
  Controller.createGame
)
gameRouter.get("/:id", Controller.getSingleGame)
gameRouter.get("/", Controller.getAllGames)
gameRouter.put(
  "/:id",
  upload.fields([
    { name: "name", maxCount: 1 },
    { name: "description", maxCount: 1 },
    { name: "playersMin", maxCount: 1 },
    { name: "playersMax", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "price", maxCount: 1 },
  ]),
  auth,
  Controller.updateGame
)
gameRouter.delete("/:id", auth, isAdmin, Controller.deleteGame)

export default gameRouter

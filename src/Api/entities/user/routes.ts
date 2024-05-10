import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const userRouter = express.Router()

userRouter.get("/:username", Controller.getProfile)
userRouter.put(
  "/:username",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "description", maxCount: 1 },
  ]),
  auth,
  Controller.updateProfile
)
userRouter.get("/", auth, isAdmin, Controller.getAllUsers)

export default userRouter

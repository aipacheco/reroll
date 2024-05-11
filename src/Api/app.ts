import express, { Application } from "express"
import router from "./router"
import cors from "cors"
import { v2 as cloudinary } from "cloudinary"

export const app: Application = express()

app.use(cors())

app.use(express.json())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const multer = require("multer")
const storage = multer.memoryStorage() // permite que los archivos se almacenen en memoria
const upload = multer({ storage: storage })

app.get("/hello", (req, res) => {
  res.status(200).json({ success: true, msg: "server is running" })
})

app.use("/api", router)

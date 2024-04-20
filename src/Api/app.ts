import express, { Application } from "express"
import router from "./router"
import cors from "cors"

export const app: Application = express()

app.use(cors())

app.use(express.json())


app.get("/hello", (req, res) => {
  res.status(200).json({ success: true, msg: "server is running" })
})

app.use('/api', router)
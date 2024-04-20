import { Router } from "express"
import authRouter from "./entities/auth/routes"
import categoryRouter from "./entities/category/routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/category", categoryRouter)

export default router

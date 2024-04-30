import { Router } from "express"
import authRouter from "./entities/auth/routes"
import categoryRouter from "./entities/category/routes"
import gameRouter from "./entities/game/routes"
import userRouter from "./entities/user/routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/category", categoryRouter)
router.use("/game", gameRouter)
router.use("/user", userRouter)

export default router

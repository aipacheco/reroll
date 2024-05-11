import { Router } from "express"
import authRouter from "./entities/auth/routes"
import categoryRouter from "./entities/category/routes"
import gameRouter from "./entities/game/routes"
import userRouter from "./entities/user/routes"
import addressRouter from "./entities/address/routes"
import transactionRouter from "./entities/transaction/routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/category", categoryRouter)
router.use("/game", gameRouter)
router.use("/user", userRouter)
router.use("/address", addressRouter)
router.use("/transaction", transactionRouter)

export default router

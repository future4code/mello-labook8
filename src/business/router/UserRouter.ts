import express from "express"
import { userInfo } from "os"
import { UserController } from "../../controller/UserController"

export const userRouter = express.Router()

userRouter.post('/signup', new UserController().signup)
import { Request, Response } from "express";
import RTBusiness from "../business/RefreshTokenBusiness";

export default class RefreshController {
    public async createRefreshToken(req: Request, res: Response) {
        try {
            const input = {
                token: req.headers.authorization as string,
                device: req.body.device as string,
                isActive: req.body.isActive as string,
                userId: req.body.userId as string
            }
            const token = await new RTBusiness().createRefreshToken(input)
            res.status(200).send({ message: "RefreshToken criado! :)", token: token })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public async getRefreshToken(req: Request, res: Response) {
        try {
            const id = req.body.id as string
            const response = await new RTBusiness().getRefreshData(id)
            res.status(200).send({ message: "RefreshToken criado! :)", token: response })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}  
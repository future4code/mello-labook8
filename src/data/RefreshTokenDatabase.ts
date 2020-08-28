import { BaseDatabase } from "./BaseDatabase";
import * as jwt from "jsonwebtoken";
import { RefreshTokenModel } from "../model/RefreshToken";

export default class RefreshTokenDatabase extends BaseDatabase {
    private static TABLE_NAME = "RefreshToken"

    public async insertRefreshToken(input: RefreshTokenModel): Promise<void> {
        try {
            await this.getConnection()
                .insert({ refresh_token: input.token, device: input.device, is_active: input.isActive, user_id: input.userId })
                .into(RefreshTokenDatabase.TABLE_NAME)


        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async generateRefreshToken(input: RefreshTokenModel): Promise<string> {
        const token = jwt.sign(
            {
                device: input.device,
                isActive: input.isActive,
                userId: input.userId
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
            }
        );
        return token;
    }

    public async getRefreshData(id: string): Promise<string> {
        try {
            
            const result = await this.getConnection().raw(`
            SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
            WHERE user_id = "${id}"
            `)
            
            const input = {
                device: result[0][0].device,
                isActive: result[0][0].is_active,
                userId: result[0][0].user_id
            }
            
            return await this.generateRefreshToken(input)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };
}
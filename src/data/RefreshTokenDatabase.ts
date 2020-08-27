import { BaseDatabase } from "./BaseDatabase";
import * as jwt from "jsonwebtoken";


export interface RefreshToken {
    token?: string,
    device: string,
    isActive: string,
    userId: string
};

export default class RefreshTokenDatabase extends BaseDatabase {
    private static TABLE_NAME = "RefreshToken"

    public async generateRefreshToken(input: RefreshToken): Promise<string> {
        try {
            await this.getConnection()
                .insert({ refresh_token: input.token, device: input.device, is_active: input.isActive, user_id: input.userId })
                .into(RefreshTokenDatabase.TABLE_NAME)

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
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async getRefreshData(user_id: string): Promise<string> {
        try {
            const result = await this.getConnection().raw(`
        SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
        WHERE user_id = "${user_id}"
        `)
            const input = {
                device: result.device,
                isActive: result.isActive,
                userId: result.userId
            }
            return await this.generateRefreshToken(input)
        } catch (error){
            throw new Error(error.sqlMessage || error.message)
        }
    };
}
import RefreshTokenDatabase, { RefreshToken } from "../data/RefreshTokenDatabase";


export default class RTBusiness {

    public async createRefreshToken(input: RefreshToken) : Promise<string> {
        if (input) {
            throw new Error("Informe todos os campos")
        }
        const token = await new RefreshTokenDatabase().generateRefreshToken(input)
        return token;
    };

    public async getRefreshData(userId: string) : Promise<string> {
        if (userId) {
            throw new Error("Informe todos os campos")
        }
        const token = await new RefreshTokenDatabase().getRefreshData(userId)
        return token;
    };
}
import RefreshTokenDatabase from "../data/RefreshTokenDatabase";
import { RefreshTokenModel } from "../model/RefreshToken";


export default class RTBusiness {

    public async createRefreshToken(input: RefreshTokenModel) : Promise<string> {
        if (!input) {
            throw new Error("Informe todos os campos")
        }
        const token = await new RefreshTokenDatabase().generateRefreshToken(input)
        return token;
    };

    public async getRefreshData(id: string) : Promise<string> {
        if (!id) {
            throw new Error("Informe todos os campos")
        }
        const token = await new RefreshTokenDatabase().getRefreshData(id)
        return token;
    };
}
import { Authenticator } from "../services/Authenticator"
import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { Post } from "../model/Post"

export default class FriendshipBusiness {
    
    public async getFeed(token: string) : Promise<Post[]> {
        try {

            if (!token) {
                throw new Error("Não autorizado.")
            }
            const tokenData = new Authenticator().getData(token)
            const feed = await new FriendshipDatabase().getFeed(tokenData.id)

            return feed;
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };
}
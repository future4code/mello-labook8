import { Authenticator } from "../services/Authenticator"
import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { Post } from "../model/Post"

export default class FriendshipBusiness {

    public async getFeed(token: string, page: string): Promise<Post[]> {
        try {
            const postsPerPage = 5;
            const pageNumber = Number(page)
            const offset = postsPerPage * (pageNumber - 1);

            if (!token) {
                throw new Error("Não autorizado.")
            }
            const tokenData = new Authenticator().getData(token)
            const feed = await new FriendshipDatabase().getFeed(tokenData.id, postsPerPage, offset)

            return feed;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };
}
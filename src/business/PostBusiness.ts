import PostsDatabase from "../data/PostsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { Post } from "../model/Post";

const postDatabase = new PostsDatabase()

export default class PostBusiness {

    public async createPost(post: Post, token: string) {
        try {

            if (!post.getDescription() || !post.getCreatedAt() || !post.getPicture() || !post.getType()) {
                throw new Error("Todos os campos são obrigatórios.")
            }

            const id = new IdGenerator().generate()
            const tokenData = new Authenticator().getData(token)
            post.setId(id)
            post.setUserId(tokenData.id)

            await postDatabase.createPost(post)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async getPostByType(type: string): Promise<Post[]> {
        try {
            if (!type) {
                throw new Error("Infome um tipo.")
            }
            
            const result = await postDatabase.getPostByType(type)

            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}

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
                type = "NORMAL"
            }
            const result = await postDatabase.getPostByType(type)
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async getLikes(user_id: string): Promise<number> {
        try {
            const result = await postDatabase.getLikes(user_id)
            let alreadyLike;

            if (result !== undefined) {
                alreadyLike = 1
            } else {
                alreadyLike = -1
            };

            return alreadyLike

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async likePost(user_id: string, post_id: string): Promise<void> {
        try {
            if (!user_id || !post_id) {
                throw new Error("Todos os campos são obrigatórios.")
            }
            await postDatabase.likePost(user_id, post_id)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async dislikePost(user_id: string, post_id: string): Promise<void> {
        try {
            if (!user_id || !post_id) {
                throw new Error("Todos os campos são obrigatórios.")
            }
            await postDatabase.dislikePost(user_id, post_id)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    
}

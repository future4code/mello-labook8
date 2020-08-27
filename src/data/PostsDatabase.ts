import { BaseDatabase } from "./BaseDatabase";
import { Post } from "../model/Post";

export default class PostsDatabase extends BaseDatabase {
    private static TABLE_NAME = "Posts_Labook"
    private static TABLE_LIKES = "Likes_Labook"

    public async createPost(post: Post): Promise<void> {
        try {

            await this.getConnection()
                .insert({
                    picture: post.getPicture(),
                    description: post.getDescription(),
                    created_at: new Date(post.getCreatedAt()),
                    type: post.getType(),
                    id: post.getId(),
                    user_id: post.getUserId()
                })
                .into(PostsDatabase.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async getPostByType(type: string): Promise<Post[]> {
        try {

            const result = await this.getConnection().raw(`
                SELECT * FROM ${PostsDatabase.TABLE_NAME}
                WHERE type = "${type}"
                ORDER BY created_at ASC
            `)

            return result[0];

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    };

    public async likePost(user_id: string, post_id: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({ user_id, post_id })
                .into(PostsDatabase.TABLE_LIKES)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async dislikePost(user_id: string, post_id: string): Promise<void> {
        try {
            await this.getConnection()
                .del()
                .from(PostsDatabase.TABLE_LIKES)
                .where({ user_id, post_id })
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getLikes(user_id: string) : Promise<any> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(PostsDatabase.TABLE_LIKES)
            .where({ user_id })
            
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
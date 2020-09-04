import { BaseDatabase } from "./BaseDatabase";

export default class CommentDatabase extends BaseDatabase {
    private static TABLE_NAME = "Comments_Labook"
    
    public async comment(comment: string, user_id: string, post_id: string) : Promise<void> {
        try {
            await this.getConnection()
            .insert({ comment, user_id, post_id })
            .into(CommentDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
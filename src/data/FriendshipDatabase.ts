import { BaseDatabase } from "./BaseDatabase";
import { Post } from "../model/Post";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_DB = "Friendship_Labook";

  public async followUser(
    user_id: string,
    user_to_follow_id: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        user_id,
        user_to_follow_id,
      })
      .into(FriendshipDatabase.TABLE_DB);
  }

  public async unFollowUser(
    user_id: string,
    user_to_follow_id: string
  ): Promise<void> {
    await this.getConnection().del().from(FriendshipDatabase.TABLE_DB).where({
      user_id,
      user_to_follow_id,
    });
  }

  public async getFeed(id: string, postsPerPage: number, offset: number): Promise<Post[]> {
    try {
      const result = await this.getConnection().raw(`
            SELECT picture, description, created_at, type, f.user_id FROM Friendship_Labook f
            JOIN Posts_Labook p 
            ON p.user_id = f.user_to_follow_id
            WHERE f.user_id = "${id}"
            ORDER BY created_at DESC
            LIMIT ${postsPerPage}
            OFFSET ${offset};
        `)
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  };

}

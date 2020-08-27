import { BaseDatabase } from "./BaseDatabase";

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
}

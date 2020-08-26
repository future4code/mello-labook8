import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  static TABLE_DB = "Users_Labook";

  public async signup(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.TABLE_DB);
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_DB)
      .where({ id });
    return result[0];
  }
}

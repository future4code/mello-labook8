import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  static TABLE_DB = "Users_Labook"

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
      password
    }).into(UserDatabase.TABLE_DB)
  }
}
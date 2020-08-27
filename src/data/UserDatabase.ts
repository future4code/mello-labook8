import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  static TABLE_DB = "Users_Labook";

  public async signup(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
        })
        .into(UserDatabase.TABLE_DB);
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_DB)
      .where({ id });
    return result[0];
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection().raw(`
        SELECT * FROM ${UserDatabase.TABLE_DB}
        WHERE email = "${email}"
      `)

      if(!result[0][0]) {
        throw new Error('Usuário não encontrado')
      }

      return new User(
        result[0][0].id, 
        result[0][0].name, 
        result[0][0].email, 
        result[0][0].password
      )
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }
}

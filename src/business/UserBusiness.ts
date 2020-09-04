import { UserSignupDTO, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { FriendshipDatabase } from "../data/FriendshipDatabase";

export class UserBusiness {

  public async signup(user: UserSignupDTO) {

    function validateEmail(email: string) {
      const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return re.test(String(email).toLowerCase());
    }


    if (!user.name || !user.email || !user.password) {
      throw new Error("Todos os campos devem ser preenchidos")
    }
    if (user.password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres')
    }
    if (!validateEmail(user.email)) {
      throw new Error("Insira um e-mail válido")
    }

    const id = new IdGenerator().generate()
    const hashPassword = await new HashManager().hash(user.password)
    const token = new Authenticator().generateToken({ id })

    await new UserDatabase().signup(id, user.name, user.email, hashPassword)

    return token
  }

  public async login(email: string, password: string) {

    if (!email || !password) {
      throw new Error('Preencha todos os campos')
    }

    const user = await new UserDatabase().getUserByEmail(email)

    const passwordTest = await new HashManager().compare(password, user.getPassword() as string)
    if (!passwordTest) {
      throw new Error('Senha incorreta')
    }

    const id = user.getId()
    const token = new Authenticator().generateToken({ id })
    return token
  }

  public async follow(
    user_to_follow_id: string,
    user_id: string
  ) {
    try {
      if (!user_to_follow_id) {
        throw new Error("insira um Id válido");
      }
      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserById(user_to_follow_id);

      if (!user) {
        throw new Error("Usuário não existe");
      }

      const friendshipDatabase = new FriendshipDatabase();
      await friendshipDatabase.followUser(user_id, user_to_follow_id);
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  };

  public async unfollow(
    user_to_follow_id: string,
    user_id: string
  ) {
    try {
      if (!user_to_follow_id) {
        throw new Error("insira um Id válido");
      }
      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserById(user_to_follow_id);

      if (!user) {
        throw new Error("Usuário não existe");
      }

      const friendshipDatabase = new FriendshipDatabase();
      await friendshipDatabase.unFollowUser(user_id, user_to_follow_id);
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  };
  
}
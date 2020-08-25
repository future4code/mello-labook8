import { UserSignupDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness {

  public async signup(user: UserSignupDTO) {

    function validateEmail(email: string) {
      const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return re.test(String(email).toLowerCase());
    }

    
    if(!user.name || !user.email || !user.password) {
      throw new Error ("Todos os campos devem ser preenchidos")
    }
    if(user.password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres')
    }
    if(!validateEmail(user.email)) {
      throw new Error("Insira um e-mail válido")
    }
    
    const id = new IdGenerator().generate()
    const hashPassword = await new HashManager().hash(user.password)
    const token = new Authenticator().generateToken({id})

    await new UserDatabase().signup(id, user.name, user.email, hashPassword)

    return token
  }
}
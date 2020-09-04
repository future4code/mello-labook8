import { Request, Response } from "express";
import { UserSignupDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserController {
  public async signup(req: Request, res: Response) {
    try {
      const newUser: UserSignupDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      const token = await new UserBusiness().signup(newUser)
      res.status(200).send({ message: "Usuário cadastrado com sucesso :)", token: token })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
    BaseDatabase.destroyConnection()
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const token = await new UserBusiness().login(email, password)

      res.status(200).send({ message: "Usuário logado com sucesso :)", token: token })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
    BaseDatabase.destroyConnection()
  }

  public async follow(req: Request, res: Response) {
    try {

      const token = req.headers.authorization as string;
      const user_to_follow_id = req.body.user_to_follow_id;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
      const user_id = authenticationData.id;

      await new UserBusiness().follow(user_to_follow_id as string, user_id)
      res.status(200).send({ message: "Seguido com sucesso!" })

    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  };

  public async unfollow(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const user_to_follow_id = req.body.user_to_unfollow_id;

      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
      const user_id = authenticationData.id;

      await new UserBusiness().follow(user_to_follow_id as string, user_id)
      res.status(200).send({ message: "Deixou de seguir com sucesso!" })

    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  };
}
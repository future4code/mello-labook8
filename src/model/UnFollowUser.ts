import {Request, Response} from "express";
import {Authenticator} from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase";
import {FriendshipDatabase} from "../data/FriendshipDatabase";
import {BaseDatabase} from "../data/BaseDatabase";

export const unFollowUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const user_to_unfollow_id = req.body.user_to_unfollow_id;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const user_id = authenticationData.id;

    if(!user_to_unfollow_id) {
      throw new Error('Insira um id válido')
    }

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserById(user_to_unfollow_id);

    if(!user) {
      throw new Error('Usuário não existe')
    }
 

    const friendshipDatabase = new FriendshipDatabase();
    await friendshipDatabase.unFollowUser(
      user_id,
      user_to_unfollow_id
    );

    res.status(200).send({
      message: 'Você deixou de seguir o usuário com sucesso'
    })
  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
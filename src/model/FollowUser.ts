import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export const FollowUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const user_to_follow_id = req.body.user_to_follow_id;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const user_id = authenticationData.id;

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

    res.status(200).send({
      message: "Amizade criada com sucesso!",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }

  await BaseDatabase.destroyConnection();
};

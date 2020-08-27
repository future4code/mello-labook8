import { Request, Response } from 'express';
import PostBusiness from '../business/PostBusiness';
import moment from 'moment';
import { Post } from '../model/Post';
import FriendshipBusiness from '../business/FeedBusiness';
import { Authenticator } from '../services/Authenticator';

export default class PostControler {

    public async getPostByType(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const type = req.query.type as string;

            const response = await new PostBusiness().getPostByType(type)

            for (let post of response) {
                const postDate = post.created_at
                const date = moment(postDate, 'YYYY-MM-DD').format('MM-DD-YY')
                post.created_at = date
            }

            res.status(200).send({ response })

        } catch (error) {
            res.status(400).send(error.message)
        }
    };


    public async createPost(req: Request, res: Response) {
        try {
            const { picture, description, type, created_at } = req.body;
            const token = req.headers.authorization as string;

            const post = {
                picture: picture as string,
                description: description as string,
                type: type as string,
                created_at: created_at
            }

            await new PostBusiness().createPost(Post.toPostModel(post), token)

            res.status(200).send({ message: "Post criado com sucesso" })


        } catch (error) {
            res.status(400).send(error.message)
        }
    };

    public async getFeed(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const feed = await new FriendshipBusiness().getFeed(token)

            for (let post of feed) {
                const postDate = post.created_at
                const date = moment(postDate, 'YYYY-MM-DD').format('MM-DD-YY')
                post.created_at = date
            }

            res.status(200).send({ feed })
        } catch (error) {
            res.status(400).send(error.message)
        };
    }

    public async likePost(req: Request, res: Response) {
        try {
            const post_id  = req.body.post_id as string 
            const token = req.headers.authorization as string
            const tokenData = new Authenticator().getData(token)

            const alreadyLike = await new PostBusiness().getLikes(tokenData.id)
            if (alreadyLike > 0) {
                res.status(200).send({ message: "Você só pode curtir o post uma vez." })
            } else {
                await new PostBusiness().likePost(tokenData.id, post_id as string)
                res.status(200).send({ message: "Curtido com sucesso "})
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    };

    public async dislikePost(req: Request, res: Response) {
        try {
            const post_id  = req.body.post_id as string
            const token = req.headers.authorization as string
            const tokenData = new Authenticator().getData(token)

            const alreadyLike = await new PostBusiness().getLikes(tokenData.id)
            if (alreadyLike < 0) {
                res.status(200).send({ message: "Você não curtia esse post." })
            } else {
                await new PostBusiness().dislikePost(tokenData.id, post_id as string)
                res.status(200).send({ message: "Descurtido com sucesso "})
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    };

    public async comment(req: Request, res: Response) {
        try {
            const post_id  = req.body.post_id as string
            const token = req.headers.authorization as string
            const tokenData = new Authenticator().getData(token)

            const alreadyLike = await new PostBusiness().getLikes(tokenData.id)
            if (alreadyLike < 0) {
                res.status(200).send({ message: "Você não curtia esse post." })
            } else {
                await new PostBusiness().dislikePost(tokenData.id, post_id as string)
                res.status(200).send({ message: "Descurtido com sucesso "})
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    };
}
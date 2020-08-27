import { Request, Response } from 'express';
import PostBusiness from '../business/PostBusiness';
import moment from 'moment';
import { Post } from '../model/Post';
import FriendshipBusiness from '../business/FeedBusiness';

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

    public async getFeed(req: Request, res: Response)  {
        try {
            const token = req.headers.authorization as string ;
            const feed = await new FriendshipBusiness().getFeed(token)
             
            for (let post of feed) {
                const postDate = post.created_at
                const date = moment(postDate, 'YYYY-MM-DD').format('MM-DD-YY') 
                post.created_at = date
            }
            
            res.status(200).send({ feed })
        } catch (error) {
            res.status(400).send( error.message )
        };
    }
}
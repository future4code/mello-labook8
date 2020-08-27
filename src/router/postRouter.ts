import express from 'express';
import PostControler from '../controller/PostController';
import { Post } from '../model/Post';

export const postRouter = express.Router();

const postController = new PostControler()

postRouter.post('/create', postController.createPost)
postRouter.get('/search', postController.getPostByType)
postRouter.get('/feed', postController.getFeed)
postRouter.post('/like', postController.likePost)
postRouter.post('/dislike', postController.dislikePost)
import express from 'express';
// import getFeed from '../controller/getFeed';
import PostControler from '../controller/PostController';
import { Post } from '../model/Post';

export const postRouter = express.Router();

const postController = new PostControler()

postRouter.post('/create', postController.createPost)
postRouter.get('/search', postController.getPostByType)
postRouter.get('/feed', postController.getFeed)
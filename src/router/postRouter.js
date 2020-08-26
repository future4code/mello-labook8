"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("../controller/PostController"));
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.default();
exports.postRouter.post('/create', postController.createPost);
exports.postRouter.get('/search', postController.getPostByType);
// postRouter.get('/feed', getFeed)

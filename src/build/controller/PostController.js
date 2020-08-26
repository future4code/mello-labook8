"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostBusiness_1 = __importDefault(require("../business/PostBusiness"));
const moment_1 = __importDefault(require("moment"));
const Post_1 = require("../model/Post");
class PostControler {
    getPostByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const type = req.query.type;
                const response = yield new PostBusiness_1.default().getPostByType(type);
                for (let post of response) {
                    const postDate = post.created_at;
                    const date = moment_1.default(postDate, 'YYYY-MM-DD').format('MM-DD-YY');
                    post.created_at = date;
                }
                res.status(200).send({ response });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    ;
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { picture, description, type, created_at } = req.body;
                const token = req.headers.authorization;
                const post = {
                    picture: picture,
                    description: description,
                    type: type,
                    created_at: created_at
                };
                yield new PostBusiness_1.default().createPost(Post_1.Post.toPostModel(post), token);
                res.status(200).send({ message: "Post criado com sucesso" });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    ;
}
exports.default = PostControler;

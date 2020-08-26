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
const PostsDatabase_1 = __importDefault(require("../data/PostsDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const postDatabase = new PostsDatabase_1.default();
class PostBusiness {
    createPost(post, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!post.getDescription() || !post.getCreatedAt() || !post.getPicture() || !post.getType()) {
                    throw new Error("Todos os campos são obrigatórios.");
                }
                const id = new IdGenerator_1.IdGenerator().generate();
                const tokenData = new Authenticator_1.Authenticator().getData(token);
                post.setId(id);
                post.setUserId(tokenData.id);
                yield postDatabase.createPost(post);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    ;
    getPostByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!type) {
                    throw new Error("Infome um tipo.");
                }
                const result = yield postDatabase.getPostByType(type);
                return result;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.default = PostBusiness;

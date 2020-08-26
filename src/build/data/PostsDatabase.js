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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("./BaseDatabase");
class PostsDatabase extends BaseDatabase_1.BaseDatabase {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    picture: post.getPicture(),
                    description: post.getDescription(),
                    created_at: new Date(post.getCreatedAt()),
                    type: post.getType(),
                    id: post.getId(),
                    user_id: post.getUserId()
                })
                    .into(PostsDatabase.TABLE_NAME);
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
                const result = yield this.getConnection().raw(`
                SELECT * FROM ${PostsDatabase.TABLE_NAME}
                WHERE type = "${type}"
                ORDER BY created_at ASC
            `);
                return result[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    ;
}
exports.default = PostsDatabase;
PostsDatabase.TABLE_NAME = "Posts_Labook";

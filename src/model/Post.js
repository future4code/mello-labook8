"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(picture, description, created_at, type, id, user_id) {
        this.picture = picture;
        this.description = description;
        this.created_at = created_at;
        this.type = type;
        this.id = id;
        this.user_id = user_id;
    }
    getPicture() { return this.picture; }
    ;
    getDescription() { return this.description; }
    ;
    getCreatedAt() { return this.created_at; }
    ;
    getType() { return this.type; }
    ;
    getId() { return this.id; }
    ;
    getUserId() { return this.user_id; }
    ;
    setId(id) { this.id = id; }
    ;
    setUserId(userId) { this.user_id = userId; }
    ;
    static toPostModel(post) {
        return new Post(post.picture, post.description, post.created_at, post.type);
    }
    ;
}
exports.Post = Post;

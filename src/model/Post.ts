export class Post {
    constructor(
        private picture: string,
        private description: string,
        public created_at: string,
        private type: string,
        private id?: string,
        private user_id?: string
    ) { }
    getPicture() { return this.picture };
    getDescription() { return this.description };
    getCreatedAt() { return this.created_at };
    getType() { return this.type };
    getId() { return this.id };
    getUserId() { return this.user_id };
    setId(id: string) { this.id = id };
    setUserId(userId: string) { this.user_id = userId };
    
    static toPostModel(post: any): Post {
        return new Post(
            post.picture,
            post.description,
            post.created_at,
            post.type
        )
    };
}
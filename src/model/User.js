"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    getId() { return this.id; }
    getName() { return this.name; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    setName(name) { this.name = name; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
    static userModel(user) {
        return new User(user.id, user.name, user.email);
    }
}
exports.User = User;

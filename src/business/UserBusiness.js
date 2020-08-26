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
exports.UserBusiness = void 0;
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../data/UserDatabase");
class UserBusiness {
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            function validateEmail(email) {
                const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                return re.test(String(email).toLowerCase());
            }
            if (!user.name || !user.email || !user.password) {
                throw new Error("Todos os campos devem ser preenchidos");
            }
            if (user.password.length < 6) {
                throw new Error('A senha deve ter no mínimo 6 caracteres');
            }
            if (!validateEmail(user.email)) {
                throw new Error("Insira um e-mail válido");
            }
            const id = new IdGenerator_1.IdGenerator().generate();
            const hashPassword = yield new HashManager_1.HashManager().hash(user.password);
            const token = new Authenticator_1.Authenticator().generateToken({ id });
            yield new UserDatabase_1.UserDatabase().signup(id, user.name, user.email, hashPassword);
            return token;
        });
    }
}
exports.UserBusiness = UserBusiness;

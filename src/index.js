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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./router/UserRouter");
const postRouter_1 = require("./router/postRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.get("/teste", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Oi, seu server está funcionando!");
    }
    catch (error) {
        res.status(400).send("ERRO");
    }
}));
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost: ${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
app.use('/user', UserRouter_1.userRouter);
app.use('/post', postRouter_1.postRouter);

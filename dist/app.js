"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = require("./routers");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: process.env.ORIGENCLIENT
}));
app.use(body_parser_1.default.json());
app.use('/api/question', routers_1.router);
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const notion_1 = require("./controllers/notion");
exports.router = express_1.default.Router();
exports.router.get('/list', notion_1.getListNotion);
exports.router.put('/update/:page_id', notion_1.updatePageNotion);
exports.router.get('/list/challenge', notion_1.getListChallengeNotion);
exports.router.get('/list/challenge/:category', notion_1.getListCategoryNotion);

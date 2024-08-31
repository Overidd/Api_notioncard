"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notion = exports.databaseId = exports.apiNotion = exports.apiKey = void 0;
const client_1 = require("@notionhq/client");
require("dotenv/config");
exports.apiKey = process.env.APIKEY;
exports.apiNotion = process.env.APINOTION;
exports.databaseId = process.env.DATABASEID;
exports.notion = new client_1.Client({ auth: exports.apiKey });

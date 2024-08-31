"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const helpers_1 = require("./helpers");
const newDatePage_1 = require("./helpers/newDatePage");
exports.router = express_1.default.Router();
const url = `${helpers_1.apiNotion}/databases/${helpers_1.databaseId}/query`;
const options = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${helpers_1.apiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
        filter: {
            property: 'Date',
            date: {
                equals: (0, helpers_1.formatterToday)(),
            },
        },
        sorts: [
            {
                property: 'Status',
                direction: "ascending"
            },
        ],
    }),
};
const jsonIdataQuestion = (data) => {
    return {
        object: data.object,
        id: data.id,
        icon: {
            type: data.icon.type,
            url: data.icon.external.url,
        },
        parent: data.parent,
        properties: {
            Question: {
                id: data.properties.Question.id,
                type: data.properties.Question.type,
                content: data.properties.Question.title[0].text.content,
                link: data.properties.Question.title[0].text.link,
            },
            Date: {
                id: data.properties.Date.id,
                type: data.properties.Date.type,
                date: data.properties.Date.date.start
            },
            Category: {
                id: data.properties.Category.id,
                type: data.properties.Category.type,
                select: data.properties.Category.select,
            },
            Theme: {
                id: data.properties.Theme.id,
                type: data.properties.Theme.type,
                select: data.properties.Theme.select,
            },
            Status: {
                id: data.properties.Status.id,
                type: data.properties.Status.type,
                name: data.properties.Status.status.name,
            },
            Answer: {
                id: data.properties.Answer.id,
                type: data.properties.Answer.type,
                content: data.properties.Answer.rich_text[0].plain_text,
                link: data.properties.Answer.rich_text[0].href,
            },
            Respontracker: {
                id: data.properties.Respontracker.id,
                type: data.properties.Respontracker.type,
                number: data.properties.Respontracker.number,
            },
        },
        url: data.url,
    };
};
exports.router.get('/list', async (req, res) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataJson = data.results.map((data) => {
            return jsonIdataQuestion(data);
        });
        return res.json({
            'message': 'list question was successfully',
            'data': dataJson
        }).status(200);
    }
    catch (error) {
        // console.error(error);
        res.json({
            message: 'Error',
            error: 'Error al consultar Notion'
        }).status(500);
    }
});
exports.router.put('/update/:page_id', async (req, res) => {
    const page_id = req.params.page_id;
    const data = req.body;
    const { newDate, respontracker } = (0, newDatePage_1.newDatePage)(data);
    try {
        await helpers_1.notion.pages.update({
            page_id: page_id,
            properties: {
                'Status': {
                    status: {
                        name: data.status,
                    },
                },
                'Date': {
                    date: {
                        start: newDate,
                    },
                },
                'Respontracker': {
                    number: respontracker,
                },
            },
        });
        return res.json({
            'message': 'update question successfully',
        }).status(200);
    }
    catch (error) {
        return res.json({
            message: 'Error',
            error: 'Error al actualizar el estado de la pregunta'
        }).status(500);
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListCategoryNotion = exports.getListChallengeNotion = exports.updatePageNotion = exports.getListNotion = void 0;
const helpers_1 = require("../helpers");
const utils_1 = require("../utils");
const newDatePage_1 = require("../helpers/newDatePage");
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
                on_or_before: (0, helpers_1.formatterToday)(),
            },
        },
        sorts: [
            {
                property: 'Status',
                direction: 'ascending'
            },
        ],
    }),
};
const getListNotion = async (req, res) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataJson = data.results.map((data) => {
            return (0, utils_1.jsonIdataQuestion)(data);
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
};
exports.getListNotion = getListNotion;
const updatePageNotion = async (req, res) => {
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
};
exports.updatePageNotion = updatePageNotion;
const getListChallengeNotion = async (req, res) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataJson = data.results.map((data) => {
            return (0, utils_1.formatChallenge)(data);
        });
        return res.json({
            message: 'list challenge was successfully',
            data: dataJson
        }).status(200);
    }
    catch (error) {
        console.error(error);
        return res.json({
            message: 'Error',
            error: 'Error al consultar Notion'
        }).status(500);
    }
};
exports.getListChallengeNotion = getListChallengeNotion;
const getListCategoryNotion = async (req, res) => {
    try {
        const category = req.params.category;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${helpers_1.apiKey}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                filter: {
                    property: 'Category',
                    select: {
                        equals: category,
                    },
                },
                sorts: [
                    {
                        property: 'Status',
                        direction: 'ascending'
                    },
                ],
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataJson = data.results.map((data) => {
            return (0, utils_1.formatChallenge)(data);
        });
        res.json({
            message: 'list challenge by category was successfully',
            data: dataJson,
        }).status(200);
    }
    catch (error) {
        res.json({
            message: 'Error',
            error: 'Error al consultar Notion'
        }).status(500);
    }
};
exports.getListCategoryNotion = getListCategoryNotion;

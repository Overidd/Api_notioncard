"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDatePage = void 0;
const utils_1 = require("../utils");
const formattedDate_1 = require("./formattedDate");
const newDatePage = (updateDate) => {
    const daysSort = updateDate.days.sort((a, b) => a - b);
    const daySortRange = daysSort.map((item, index) => item + (index + 1));
    let respontracker = updateDate.respontracker;
    let dayRandom;
    const newDate = new Date();
    if (updateDate.status === utils_1.OpctionsStatus.Incorrect) {
        respontracker -= updateDate.penaltyIcorrect || 2;
        if (respontracker <= 0) {
            respontracker = 1;
        }
    }
    if (updateDate.status === utils_1.OpctionsStatus.Regular) {
        respontracker -= updateDate.penaltyRegular || 1;
        if (respontracker <= 0) {
            respontracker = 1;
        }
    }
    if (updateDate.status === utils_1.OpctionsStatus.Correct) {
        respontracker += updateDate.penaltyCorrecet || 1;
        if (respontracker > daysSort.length) {
            respontracker = daysSort.length;
        }
    }
    dayRandom = numRandomDay(daySortRange[respontracker - 1], daysSort[respontracker - 1]);
    newDate.setDate(newDate.getDate() + dayRandom);
    return {
        newDate: (0, formattedDate_1.formattedDate)(newDate),
        respontracker
    };
};
exports.newDatePage = newDatePage;
const numRandomDay = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

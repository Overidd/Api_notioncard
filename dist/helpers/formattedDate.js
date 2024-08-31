"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedDate = exports.formatterToday = void 0;
// const isoDate = "2024-08-18T22:43:00.000Z";
const formatterToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.formatterToday = formatterToday;
const formattedDate = (date) => {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.formattedDate = formattedDate;

import express from 'express';
import { getListCategoryNotion, getListChallengeNotion, getListNotion, updatePageNotion } from './controllers/notion';

export const router = express.Router();
router.get('/list', getListNotion)
router.put('/update/:page_id', updatePageNotion)
router.get('/list/challenge', getListChallengeNotion)
router.get('/list/challenge/:category', getListCategoryNotion)
import {Client} from '@notionhq/client';
import  'dotenv/config'

export const apiKey = process.env.APIKEY
export const apiNotion = process.env.APINOTION
export const databaseId = process.env.DATABASEID
export const notion = new Client({ auth: apiKey })


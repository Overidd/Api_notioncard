import { Request, Response } from 'express'
import { notion, databaseId, apiKey, formatterToday, apiNotion } from '../helpers'
import { DataNodeResponse, formatChallenge, jsonIdataQuestion } from '../utils'
import { newDatePage } from '../helpers/newDatePage';

const url = `${apiNotion}/databases/${databaseId}/query`;
const options = {
   method: 'POST',
   headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
   },
   body: JSON.stringify({
      filter: {
         property: 'Date',
         date: {
            on_or_before: formatterToday(),
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


export const getListNotion = async (req: Request, res: Response) => {
   try {
      const response = await fetch(url, options);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dataJson = data.results.map((data: DataNodeResponse) => {
         return jsonIdataQuestion(data)
      })

      return res.json({
         'message': 'list question was successfully',
         'data': dataJson

      }).status(200)
   } catch (error) {
      // console.error(error);
      res.json({
         message: 'Error',
         error: 'Error al consultar Notion'
      }).status(500);
   }
};

export const updatePageNotion = async (req: Request, res: Response) => {
   const page_id = req.params.page_id
   const data = req.body;
   const { newDate, respontracker } = newDatePage(data)

   try {
      await notion.pages.update({
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

   } catch (error) {
      return res.json({
         message: 'Error',
         error: 'Error al actualizar el estado de la pregunta'
      }).status(500);
   }
};

export const getListChallengeNotion = async (req: Request, res: Response) => {
   try {
      const response = await fetch(url, options);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dataJson = data.results.map((data: DataNodeResponse) => {
         return formatChallenge(data)
      })

      return res.json({
         message: 'list challenge was successfully',
         data: dataJson
      }).status(200)

   } catch (error) {
      console.error(error);
      return res.json({
         message: 'Error',
         error: 'Error al consultar Notion'
      }).status(500)
   }
};

export const getListCategoryNotion = async (req: Request, res: Response) => {
   try {
      const category = req.params.category
      const response = await fetch(url,
         {
            method: 'POST',
            headers: {

               'Authorization': `Bearer ${apiKey}`,
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
         })


      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dataJson = data.results.map((data: DataNodeResponse) => {
         return formatChallenge(data)
      })

      res.json({
         message: 'list challenge by category was successfully',
         data: dataJson,
      }).status(200)

   } catch (error) {
      res.json({
         message: 'Error',
         error: 'Error al consultar Notion'
      }).status(500)
   }
};
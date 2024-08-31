import { DataNodeResponse } from "./typeNodeResponse"

export const jsonIdataQuestion = (data: DataNodeResponse) => {
   return {
      object: data.object,
      id: data.id,
      page_url: data.url,
      icon_url: data.icon.external.url,
      database_id: data.parent.database_id,
      properties: {
         Question: {
            // id: data.properties.Question.id,
            // type: data.properties.Question.type,
            content: data.properties.Question.title[0]?.text.content ?? null,
            link: data.properties.Question.title[0]?.text.link ?? null,
         },
         Category: {
            id: data.properties.Category.id,
            // type: data.properties.Category.type,
            select: data.properties.Category.select?.name ?? null,
            color: data.properties.Category.select?.color ?? null,
         },
         Theme: {
            id: data.properties.Theme.id,
            // type: data.properties.Theme.type,
            select: data.properties.Theme.select?.name ?? null,
            color: data.properties.Theme.select?.color ?? null,
         },
         Status: {
            // id: data.properties.Status.id,
            // type: data.properties.Status.type,
            name: data.properties.Status.status?.name ?? null,
            color: data.properties.Status.status?.color ?? null,
         },
         Answer: {
            // id: data.properties.Answer.id,
            // type: data.properties.Answer.type,
            content: data.properties.Answer.rich_text[0]?.plain_text || null,
            link: data.properties.Answer.rich_text[0]?.href || null,
         },
         Date: {
            // id: data.properties.Date.id,
            // type: data.properties.Date.type,
            date: data.properties.Date.date.start
         },
         Respontracker: {
            // id: data.properties.Respontracker.id,
            // type: data.properties.Respontracker.type,
            number: data.properties.Respontracker.number,
         },
      },

   }
}

export const formatChallenge = (data: DataNodeResponse) => {
   return {
      id: data.id,
      page_url: data.url,
      icon_url: data.icon.external.url || null,
      Question: data.properties.Question.title[0]?.text.content ?? null,
      Category: {
         select: data.properties.Category.select?.name || null,
         color: data.properties.Category.select?.color || null,
      },
      Theme: {
         select: data.properties.Theme.select?.name || null,
         color: data.properties.Theme.select?.color || null,
      },
      Answers: [
         data.properties.Answer.rich_text[0]?.plain_text || null],
   }
}
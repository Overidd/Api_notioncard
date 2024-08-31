import { IupdatePageDate, OpctionsStatus } from "../utils";
import { formattedDate } from "./formattedDate";

export const newDatePage = (updateDate: IupdatePageDate) => {
   const daysSort = updateDate.days.sort((a, b) => a - b);
   const daySortRange = daysSort.map((item, index) => item + (index + 1));

   let respontracker = updateDate.respontracker;

   let dayRandom: number;
   const newDate = new Date();

   if (updateDate.status === OpctionsStatus.Incorrect) {
      respontracker -= updateDate.penaltyIcorrect || 2

      if (respontracker <= 0) {
         respontracker = 1
      }
   }

   if (updateDate.status === OpctionsStatus.Regular) {
      respontracker -= updateDate.penaltyRegular || 1

      if (respontracker <= 0) {
         respontracker = 1
      }
   }

   if (updateDate.status === OpctionsStatus.Correct) {
      respontracker += updateDate.penaltyCorrecet || 1

      if (respontracker > daysSort.length) {
         respontracker = daysSort.length
      }
   }

   dayRandom = numRandomDay(daySortRange[respontracker - 1], daysSort[respontracker - 1])

   newDate.setDate(newDate.getDate() + dayRandom)

   return {
      newDate: formattedDate(newDate),
      respontracker
   }
}


const numRandomDay = (max: number, min: number) => {
   return Math.floor(Math.random() * (max - min+1)) + min;
}



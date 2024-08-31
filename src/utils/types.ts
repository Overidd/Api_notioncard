
export enum OpctionsStatus {
   Incorrect = 'Incorrect',
   Regular = 'Regular',
   Correct = 'Correct',
}
export type IupdatePageDate = {
   // id_page: string,
   id_database: string,
   status: OpctionsStatus,
   respontracker: number,
   // incorrect: number,
   // regular: number,
   days: [
      number
   ]
   penaltyIcorrect?: number,
   penaltyRegular?: number,
   penaltyCorrecet?: number,
}
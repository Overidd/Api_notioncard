// const isoDate = "2024-08-18T22:43:00.000Z";
export const formatterToday = () => {
   const today = new Date();

   const year = today.getFullYear();
   const month = (today.getMonth() + 1).toString().padStart(2, '0')
   const day = today.getDate().toString().padStart(2, '0');

   return `${year}-${month}-${day}`;
}

export const formattedDate = (date: Date) => {
   const today = new Date(date);

   const year = today.getFullYear();
   const month = (today.getMonth() + 1).toString().padStart(2, '0')
   const day = today.getDate().toString().padStart(2, '0');

   return `${year}-${month}-${day}`;
}


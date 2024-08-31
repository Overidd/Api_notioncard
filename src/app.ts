import express from 'express';
import BodyParser from 'body-parser';
import {router} from './routers'
import cors from'cors'
import  'dotenv/config'

const app = express();
const port = 3000;

app.use(cors({
   origin: process.env.ORIGENCLIENT
}))
app.use(BodyParser.json())
app.use('/api/question',router)

app.listen(port, () => {
   console.log(`Servidor escuchando en el puerto ${port}`);
});

 
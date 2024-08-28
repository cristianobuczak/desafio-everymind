import express from 'express';
import publicRouters from './routers/public.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', publicRouters);

app.listen(3000, () => console.log('Servidor rodando...'))
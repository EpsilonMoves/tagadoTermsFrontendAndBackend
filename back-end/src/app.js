import express from 'express';
import { termsRouter } from './routes/terms.js';
import cors from'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.use(termsRouter)

export {app}
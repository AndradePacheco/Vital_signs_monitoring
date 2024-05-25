import express, { Router } from 'express';
import mongoose from 'mongoose';
import { router } from './router';

const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/api')
.then(() => {
    console.log("Conected to Mongo")

    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.listen(port, () => {
     console.log(`Servidor rodando na porta ${port}`);
    });
})
.catch(() => console.log("Error on conecting to Mongo"));


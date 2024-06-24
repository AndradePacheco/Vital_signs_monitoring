import express, { Router } from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';


const cors = require('cors');

const app = express();
const port = 3001;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

mongoose.connect('mongodb://127.0.0.1:27017/api')
.then(() => {
    console.log("Conected to Mongo")

    app.use(express.json());
    app.use(cors());
    app.use(router);

    httpServer.listen(port, () => {
     console.log(`Servidor rodando na porta ${port}`);
   });

   io.on('connection', (socket) => {
    console.log("Novo usuário conectado" + socket.id)
    socket.emit('message', "Hello World")
    socket.on('disconnect', () => {
      console.log("Usuário disconectado");
    });
  });
})
.catch(() => console.log("Error on conecting to Mongo"));

export default io;
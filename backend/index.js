import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import boooksRoute from './routs/booksRoute.js'
import cors from 'cors'


const app = express()

app.use(express.json());

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'DELETE', 'PUT'],
   allowedHeaders: ['Content-Type'],
}))

app.get('/', (request, response) => {
   console.log(request);
   return response.status(234).send("Helo World!")
});

app.use('/books', boooksRoute);


mongoose
   .connect(mongoDBURL)
   .then(() => {
      console.log("Success");
      app.listen(PORT, () => {
         console.log(`App is listening to PORT: ${PORT}`);
      })
   })
   .catch((error) => {
      console.log(error);
   })


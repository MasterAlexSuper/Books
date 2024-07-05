import express from "express";
import { Book } from "../models/bookModels.js";


const router = express.Router()
// Route to Save a Book
router.post('/', async (request, response) => {
   try {
      if (
         !request.body.title ||
         !request.body.author ||
         !request.body.publishYear
      ) {
         return response.status(400).send({
            message: "Send all required fields"
         })
      };

      const newBook = {
         title: request.body.title,
         author: request.body.author,
         publishYear: request.body.publishYear,
      };

      const book = await Book.create(newBook);

      return response.status(201).send(book);

   } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message })
   }
})

// Route for Get All Books from DB
router.get('/', async (request, response) => {
   try {
      const books = await Book.find({});

      return response.status(200).json({
         count: books.length,
         data: books
      });
   } catch (error) {
      console.log(error);
      response.status(500).send({
         message: error.message
      })
   }
})
// Route for Get Book by Id from DB
router.get('/:id', async (request, response) => {
   try {

      const { id } = request.params;
      const book = await Book.findById(id);

      return response.status(200).json(book);
   } catch (error) {
      console.log(error);
      response.status(500).send({
         message: error.message
      })
   }
})

router.put('/:id', async (request, response) => {
   try {
      if (
         !request.body.title ||
         !request.body.author ||
         !request.body.publishYear
      ) {
         return response.status(400).send({ message: "Send all required fields: title, author, publishYear" });
      }

      const { id } = request.params;

      const result = await Book.findByIdAndUpdate(id, request.body);

      if (!result) {
         return response.status(404).json({ message: "Book not found" })
      }

      return response.status(200).send({ message: "Book updated successfully" })
   } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
   }
});
// Route to delete a book
router.delete('/:id', async (request, response) => {
   try {

      const { id } = request.params;

      const result = await Book.findByIdAndDelete(id);
      if (!result) {
         return response.status(404).json({ message: "Book not found" })
      }

      return response.status(200).send({ message: "Book deleted Successfully" })

   } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message })
   }
})


export default router;
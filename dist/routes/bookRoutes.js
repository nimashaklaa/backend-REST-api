import express from "express";
import { BookController } from "../controllers/bookController.js";
const router = express.Router();
router.post('/', BookController.createBook);
router.get('/', BookController.readBooks);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
export default router;

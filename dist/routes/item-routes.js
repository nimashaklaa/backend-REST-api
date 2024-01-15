import express from "express";
import { BookController } from "../controllers/bookController";
const router = express.Router();
router.post('/add-item', BookController.createItems);
router.get('/get-items', BookController.readItems);
router.put('/update-item/:id', BookController.updateItem);
router.delete('/delete-item/:id', BookController.deleteItem);
export default router;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../configs/db.js";
import Book from "../models/Book.js";
export class BookController {
    static createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publicationYear } = req.body;
            if (!title || !author || !publicationYear) {
                return res.status(400).json({ message: 'Title, author, and publicationYear are required' });
            }
            try {
                console.log(db.data); // Log the db.data to check its value
                const newBook = new Book(db.data.items.length + 1, title, author, publicationYear);
                db.data.items.push(newBook);
                yield db.write();
                res.status(200).json({ message: 'Book added successfully', book: newBook.title });
            }
            catch (ex) {
                console.error(ex);
                res.status(400).json({ message: 'Error occurred', error: ex });
            }
        });
    }
    static readBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.read();
                res.status(200).json({ message: "Books", items: db.data.items });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred" });
            }
        });
    }
    static updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, author, publicationYear } = req.body;
            if (!id || !title || !author)
                return res.status(400).json({ message: "id or name is Required" });
            try {
                console.log('Existing Book IDs:', db.data.items.map(book => book.id));
                const itemIndex = db.data.items.findIndex((book) => book.id === parseInt(id));
                if (itemIndex === -1) {
                    throw new Error('Book not found');
                }
                if (!itemIndex) {
                    throw new Error('Book index does not found');
                }
                db.data.items[itemIndex] = {
                    id: parseInt(id),
                    title,
                    author,
                    publicationYear
                };
                yield db.write();
                res.status(200).json({ message: "Book updated successfully" });
            }
            catch (ex) {
                console.log(ex);
                res.status(400).json({ message: "Error occurred", error: ex });
            }
        });
    }
    static deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                return res.status(400).json({ message: "id of the book is Required" });
            try {
                const itemIndex = db.data.items.findIndex((book) => book.id === parseInt(id));
                if (!itemIndex) {
                    throw new Error('Book index does not found');
                }
                db.data.items.splice(itemIndex, 1);
                yield db.write();
                res.status(200).json({ message: "Book deleted successfully" });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred", error: ex });
            }
        });
    }
}

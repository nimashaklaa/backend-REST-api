"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const db_js_1 = require("../configs/db.js");
const Book_js_1 = __importDefault(require("../models/Book.js"));
class BookController {
    static createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publicationYear } = req.body;
            if (!title || !author || !publicationYear) {
                return res.status(400).json({ message: 'Title, author, and publicationYear are required' });
            }
            try {
                console.log(db_js_1.db.data); // Log the db.data to check its value
                const newBook = new Book_js_1.default(db_js_1.db.data.items.length + 1, title, author, publicationYear);
                db_js_1.db.data.items.push(newBook);
                yield db_js_1.db.write();
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
                yield db_js_1.db.read();
                res.status(200).json({ message: "Books", items: db_js_1.db.data.items });
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
                console.log('Existing Book IDs:', db_js_1.db.data.items.map(book => book.id));
                const itemIndex = db_js_1.db.data.items.findIndex((book) => book.id === parseInt(id));
                if (itemIndex === -1) {
                    throw new Error('Book not found');
                }
                if (!itemIndex) {
                    throw new Error('Book index does not found');
                }
                db_js_1.db.data.items[itemIndex] = {
                    id: parseInt(id),
                    title,
                    author,
                    publicationYear
                };
                yield db_js_1.db.write();
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
                const itemIndex = db_js_1.db.data.items.findIndex((book) => book.id === parseInt(id));
                if (!itemIndex) {
                    throw new Error('Book index does not found');
                }
                db_js_1.db.data.items.splice(itemIndex, 1);
                yield db_js_1.db.write();
                res.status(200).json({ message: "Book deleted successfully" });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred", error: ex });
            }
        });
    }
}
exports.BookController = BookController;

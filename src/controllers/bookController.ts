import {Request,Response} from "express";
import {db} from "../configs/db.js";
import Book from "../models/Book.js";

export class BookController {
    public static async createBook(req: Request, res: Response) {
        const { title, author, publicationYear } = req.body;

        if (!title || !author || !publicationYear) {
            return res.status(400).json({ message: 'Title, author, and publicationYear are required' });
        }

        try {
            console.log(db.data);  // Log the db.data to check its value
            const newBook = new Book(db.data.items.length+1, title, author, publicationYear);
            db.data.items.push(newBook);
            await db.write();
            res.status(200).json({ message: 'Book added successfully', book: newBook.title });
        } catch (ex) {
            console.error(ex);
            res.status(400).json({ message: 'Error occurred',error:ex });
        }
    }


    public static async readBooks(req:Request, res:Response){
        try{
            await db.read()
            res.status(200).json({message:"Books",items:db.data.items})
        }catch(ex){
            res.status(400).json({message:"Error occurred"})
        }
    }
    public static async updateBook(req:Request, res:Response){
        const {id}= req.params
        const {title,author,publicationYear} = req.body
        if(!id || !title ||!author) return res.status(400).json({message:"id or name is Required"})
        try{
            console.log('Existing Book IDs:', db.data.items.map(book => book.id));
            const itemIndex = db.data.items.findIndex((book)=>book.id === parseInt(id))
            if (itemIndex === -1) {
                throw new Error('Book not found');
            }
            if (!itemIndex) {
                throw new Error('Book index does not found')
            }
            db.data.items[itemIndex] ={
                id:parseInt(id),
                title,
                author,
                publicationYear
            }
            await db.write()
            res.status(200).json({message:"Book updated successfully"})
        }catch(ex){
            console.log(ex)
            res.status(400).json({message:"Error occurred",error:ex})
        }
    }
    public static async deleteBook(req:Request, res:Response){
        const {id}= req.params
        if(!id ) return res.status(400).json({message:"id of the book is Required"})
        try{
            const itemIndex = db.data.items.findIndex((book)=>book.id === parseInt(id))
            if (!itemIndex) {
                throw new Error('Book index does not found')
            }
            db.data.items.splice(itemIndex,1)
            await db.write()
            res.status(200).json({message:"Book deleted successfully"})
        }catch(ex){
            res.status(400).json({message:"Error occurred",error:ex})
        }
    }
}
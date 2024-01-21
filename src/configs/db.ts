import {Low} from 'lowdb';
import {JSONFile} from "lowdb/node";
import Book from "../models/Book";

interface DbSchema{
    items:Book[];
}
//Set up the database
const adapter = new JSONFile<DbSchema>('db.json');
const db = new Low(adapter,{
    items:[]
});

//initialize the database with default values
async function initializedDb(){
    try {
        await db.read();

        // Check if db.data is undefined or not an object and initialize it properly
        if (!db.data || typeof db.data !== 'object') {
            console.error('Invalid or undefined db.data. Initializing with an empty object.');
            db.data = { items: [] };
        }

        await db.write();
        console.log('Database initialized successfully ✅');
    } catch (error) {
        console.error('Error initializing the database:', error);
    }

}
export {db,initializedDb}

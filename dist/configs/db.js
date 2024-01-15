var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Low } from 'lowdb';
import { JSONFile } from "lowdb/node";
//Set up the database
const adapter = new JSONFile('db.json');
const db = new Low(adapter, {
    items: []
});
//initialize the database with default values
function initializedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.read();
            // Check if db.data is undefined or not an object and initialize it properly
            if (!db.data || typeof db.data !== 'object') {
                console.error('Invalid or undefined db.data. Initializing with an empty object.');
                db.data = { items: [] };
            }
            yield db.write();
            console.log('Database initialized successfully ✅');
        }
        catch (error) {
            console.error('Error initializing the database:', error);
        }
    });
}
export { db, initializedDb };

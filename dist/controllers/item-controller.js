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
export class ItemController {
    static createItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!name)
                return res.status(400).json({ message: "Name is Required" });
            try {
                db.data.items.push({
                    id: db.data.items.length + 1,
                    name
                });
                yield db.write();
                res.status(200).json({ message: "Name added successfully" });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred" });
            }
        });
    }
    static readItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.read();
                res.status(200).json({ message: "Items", items: db.data.items });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred" });
            }
        });
    }
    static updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            if (!id || !name)
                return res.status(400).json({ message: "id or name is Required" });
            try {
                const itemIndex = db.data.items.findIndex((item) => item.id === parseInt(id));
                if (!itemIndex) {
                    throw new Error('Item index does not found');
                }
                db.data.items[itemIndex] = {
                    id: parseInt(id),
                    name
                };
                yield db.write();
                res.status(200).json({ message: "Item updated successfully" });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred", error: ex });
            }
        });
    }
    static deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                return res.status(400).json({ message: "id  is Required" });
            try {
                const itemIndex = db.data.items.findIndex((item) => item.id === parseInt(id));
                if (!itemIndex) {
                    throw new Error('Item index does not found');
                }
                db.data.items.splice(itemIndex, 1);
                yield db.write();
                res.status(200).json({ message: "Item deleted successfully" });
            }
            catch (ex) {
                res.status(400).json({ message: "Error occurred", error: ex });
            }
        });
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_js_1 = require("../controllers/bookController.js");
const router = express_1.default.Router();
router.post('/', bookController_js_1.BookController.createBook);
router.get('/', bookController_js_1.BookController.readBooks);
router.put('/:id', bookController_js_1.BookController.updateBook);
router.delete('/:id', bookController_js_1.BookController.deleteBook);
exports.default = router;

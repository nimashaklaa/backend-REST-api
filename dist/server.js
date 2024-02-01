"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./configs/db.js");
const bookRoutes_js_1 = __importDefault(require("./routes/bookRoutes.js"));
const PORT = 9000;
const app = (0, express_1.default)();
//initialize DB
(0, db_js_1.initializedDb)().then(() => {
    console.log('db initialized ✅');
});
//json serialize
app.use(express_1.default.json()); //start to read json formats
//routes middlewares
app.use("/api/v1/books", bookRoutes_js_1.default);
app.listen(PORT, () => {
    console.log(`🚀💨 Server running on port ${PORT}`);
});

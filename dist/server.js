import express from "express";
import { initializedDb } from "./configs/db.js";
import bookRoutes from "./routes/bookRoutes.js";
const PORT = 9000;
const app = express();
//initialize DB
initializedDb().then(() => {
    console.log('db initialized ✅');
});
//json serialize
app.use(express.json()); //start to read json formats
//routes middlewares
app.use("/api/v1/books", bookRoutes);
app.listen(PORT, () => {
    console.log(`🚀💨 Server running on port ${PORT}`);
});

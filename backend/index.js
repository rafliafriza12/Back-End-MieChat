import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// connect to mongo db (db_name)
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("database connected..."));

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
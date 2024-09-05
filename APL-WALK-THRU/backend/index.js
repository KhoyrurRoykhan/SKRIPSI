import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/routes.js";
import Database from "./config/Database.js";
import Users from "./models/UserModel.js";

dotenv.config();
const app = express();

try {
    await Database.authenticate();
    console.log('Database Connected...');
    await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(5000, ()=> console.log('Server up and running...'));
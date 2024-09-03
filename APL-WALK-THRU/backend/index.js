import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import Database from "./config/Database.js";
import Users from "./models/UserModel.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

try {
    await Database.authenticate();
    console.log('Database Connected...');
    await Users.sync();
} catch (error) {
    console.error(error);
}

app.listen(5000, ()=> console.log('Server up and running...'));
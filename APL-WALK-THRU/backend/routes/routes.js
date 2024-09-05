import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const routes = express.Router();

routes.get('/users', verifyToken, getUsers);
// routes.get('/users', getUsers);
routes.post('/users', Register);
routes.post('/login', Login);
routes.get('/token', refreshToken);
routes.delete('/logout', Logout);

export default routes;
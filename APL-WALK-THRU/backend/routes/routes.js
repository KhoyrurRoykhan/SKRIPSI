import express from "express";
import { getUsers, Register, Login, Logout, getProgresBelajarSiswa, getProgresTantanganSiswa } from "../controllers/UserController.js";
import { getGuru, RegisterGuru, LoginGuru, LogoutGuru, getMeGuru } from "../controllers/GuruController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { verifyGuruToken } from "../middleware/VerifyTokenGuru.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { refreshTokenGuru } from "../controllers/RefreshTokenGuru.js";
import { countUsersByTokenKelas, 
    countSiswaSelesaiBelajar, 
    countSiswaSelesaiTantangan, 
    getUsersByTokenKelas,
    updateUserById,
    deleteUserById
    } from "../controllers/UserController.js";

import { getAllNilaiSiswa, getNilaiByTokenKelas, getNilaiByKuis } from "../controllers/NilaiController.js";

const routes = express.Router();

// User Routes
routes.get('/users', verifyToken, getUsers);
routes.post('/users', Register);
routes.post('/login', Login);
routes.get('/token', refreshToken);
routes.delete('/logout', Logout);

routes.get('/count-users', countUsersByTokenKelas);
routes.get('/count-selesai-belajar', countSiswaSelesaiBelajar);
routes.get('/count-selesai-tantangan', countSiswaSelesaiTantangan);
routes.get('/users/by-token', getUsersByTokenKelas);
routes.put('/users/:id', updateUserById);
routes.delete('/users/:id', deleteUserById);

routes.get('/user/progres-belajar', getProgresBelajarSiswa);
routes.get('/user/progres-tantangan', getProgresTantanganSiswa);


// Guru Routes
routes.get('/guru', verifyGuruToken, getGuru);
routes.post('/guru', RegisterGuru);
routes.post('/login-guru', LoginGuru);
routes.get('/token-guru', refreshTokenGuru);
routes.delete('/logout-guru', LogoutGuru);
routes.get('/me-guru', verifyGuruToken, getMeGuru);

routes.get("/nilai", getAllNilaiSiswa);
routes.get("/nilai/by-token", getNilaiByTokenKelas);
routes.get("/nilai/by-kuis", getNilaiByKuis);


export default routes;

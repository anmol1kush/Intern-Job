import express from "express";
import { login, logout, register, updateprofile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUplode } from "../middleware/multer.js";
const router= express.Router();

router.route("/register").post( singleUplode,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUplode, updateprofile);

export default router;





import express from "express";
import {
	login,
	register,
	users,
	cleanup,
	getUserDynamicData,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/users", users);
router.delete("/cleanup", cleanup);
router.post("/getUserDynamicData", getUserDynamicData);

export default router;

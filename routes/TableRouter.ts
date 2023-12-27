import express from "express";
import {
	store,
	getOne,
	getAll,
	destroy,
	cleanup,
	update,
	getTablesByRestaurantId,
} from "../controllers/TableController.js";

const router = express.Router();

router.post("/create", store);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.post("/update/:id", update);
router.delete("/destroy/:id", destroy);
router.delete("/cleanup", cleanup);
router.get("/getbyrestaurantid/:id", getTablesByRestaurantId);

export default router;

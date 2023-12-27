import express from "express";
import {
	store,
	getAll,
	getOne,
	update,
	destroy,
	cleanup,
} from "../controllers/RestaurantController";

const router = express.Router();

router.post("/create", store);
router.get("/getall", getAll);
router.get("/get/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", destroy);
router.delete("/cleanup", cleanup);

export default router;

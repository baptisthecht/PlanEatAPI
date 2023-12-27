import express from "express";
import {
	getAll,
	getAvaliabitiesByDateAndRestaurant,
	getBookingsByRestaurant,
	getBookingsByUser,
	getBookingsByUserAndStatus,
	store,
	updateStatus,
} from "../controllers/BookingController";

const router = express.Router();

router.post("/create", store);
router.post("/availabilities", getAvaliabitiesByDateAndRestaurant);
router.post("/updateStatus", updateStatus);
router.get("/getall", getAll);
router.post("/getByUserAndStatus", getBookingsByUserAndStatus);
router.post("/getByUser", getBookingsByUser);
router.post("/getByRestaurant", getBookingsByRestaurant);

export default router;

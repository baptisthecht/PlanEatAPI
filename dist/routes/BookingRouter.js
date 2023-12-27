"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookingController_1 = require("../controllers/BookingController");
const router = express_1.default.Router();
router.post("/create", BookingController_1.store);
router.post("/availabilities", BookingController_1.getAvaliabitiesByDateAndRestaurant);
router.post("/updateStatus", BookingController_1.updateStatus);
router.get("/getall", BookingController_1.getAll);
router.post("/getByUserAndStatus", BookingController_1.getBookingsByUserAndStatus);
router.post("/getByUser", BookingController_1.getBookingsByUser);
router.post("/getByRestaurant", BookingController_1.getBookingsByRestaurant);
exports.default = router;

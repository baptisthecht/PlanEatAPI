"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RestaurantController_1 = require("../controllers/RestaurantController");
const router = express_1.default.Router();
router.post("/create", RestaurantController_1.store);
router.get("/getall", RestaurantController_1.getAll);
router.get("/get/:id", RestaurantController_1.getOne);
router.put("/update/:id", RestaurantController_1.update);
router.delete("/delete/:id", RestaurantController_1.destroy);
router.delete("/cleanup", RestaurantController_1.cleanup);
exports.default = router;

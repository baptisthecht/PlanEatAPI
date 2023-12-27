"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TableController_js_1 = require("../controllers/TableController.js");
const router = express_1.default.Router();
router.post("/create", TableController_js_1.store);
router.get("/getall", TableController_js_1.getAll);
router.get("/getone/:id", TableController_js_1.getOne);
router.post("/update/:id", TableController_js_1.update);
router.delete("/destroy/:id", TableController_js_1.destroy);
router.delete("/cleanup", TableController_js_1.cleanup);
router.get("/getbyrestaurantid/:id", TableController_js_1.getTablesByRestaurantId);
exports.default = router;

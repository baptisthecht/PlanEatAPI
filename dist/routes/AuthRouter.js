"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_js_1 = require("../controllers/AuthController.js");
const router = express_1.default.Router();
router.post("/login", AuthController_js_1.login);
router.post("/register", AuthController_js_1.register);
router.get("/users", AuthController_js_1.users);
router.delete("/cleanup", AuthController_js_1.cleanup);
router.post("/getUserDynamicData", AuthController_js_1.getUserDynamicData);
exports.default = router;

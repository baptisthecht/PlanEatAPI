"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TimeSchema = new mongoose_1.default.Schema({
    displayTime: String,
    available: Boolean,
});
exports.Time = mongoose_1.default.model("Time", TimeSchema);

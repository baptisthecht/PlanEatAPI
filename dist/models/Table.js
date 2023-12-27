"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tableSchema = new mongoose_1.default.Schema({
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
exports.Table = mongoose_1.default.model("Table", tableSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    tableIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required: true,
    },
    releaseTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed",
    },
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    restaurantData: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
    },
});
exports.Booking = mongoose_1.default.model("Booking", bookingSchema);

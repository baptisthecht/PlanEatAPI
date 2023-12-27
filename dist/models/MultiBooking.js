"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const multiBookingSchema = new mongoose_1.default.Schema({
    bookingIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },
    ],
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
    restaurant: {
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
exports.MultiBooking = mongoose_1.default.model("MultiBooking", multiBookingSchema);

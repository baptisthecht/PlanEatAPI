import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
	tableIds: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Table",
			required: true,
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
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
		type: mongoose.Schema.Types.ObjectId,
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

export const Booking = mongoose.model("Booking", bookingSchema);

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
	referedUserId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	referedUserPaid: {
		type: Boolean,
		default: false,
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
		enum: ["pending", "confirmed", "cancelled"],
		default: "pending",
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

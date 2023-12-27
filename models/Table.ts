import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
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

export const Table = mongoose.model("Table", tableSchema);

import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
	displayTime: String,
	available: Boolean,
});

export const Time = mongoose.model("Time", TimeSchema);

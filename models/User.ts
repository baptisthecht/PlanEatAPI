import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
});

export const User = mongoose.model("User", UserSchema);
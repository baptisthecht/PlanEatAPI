import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";
import { User } from "./models/User.js";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import AuthRouter from "./routes/AuthRouter.js";

const { sign } = pkg;

mongoose
	.connect(
		"mongodb+srv://bahct:allezlille@cluster0.swmjfyr.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/health", (req, res) => {
	res.send("Life is beautiful!");
});

app.use("/auth", AuthRouter);

app.listen(8800, () => {
	console.log("API Working!");
});

export default app;

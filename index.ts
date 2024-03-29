import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routes/AuthRouter.js";
import BookingRouter from "./routes/BookingRouter.js";
import RestaurantRouter from "./routes/RestaurantRouter.js";
import TableRouter from "./routes/TableRouter.js";

mongoose
	.connect(process.env.MONGO_URL)
	// tslint:disable-next-line:no-console
	.then(() => console.log("Connected to MongoDB"))
	// tslint:disable-next-line:no-console
	.catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/health", (req, res) => {
	res.send("Life is beautiful!");
});

app.use("/auth", AuthRouter);
app.use("/booking", BookingRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/table", TableRouter);

app.listen(8800, () => {
	console.log("API Working!");
});

export default app;

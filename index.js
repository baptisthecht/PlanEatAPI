import express from "express";
import cors from "cors";

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create testing route
app.get("/health", (req, res) => {
	res.send("Life is beautiful!");
});

// Launching the app on port 8800
app.listen(8800, () => {
	console.log("API Working!");
});

export default app;

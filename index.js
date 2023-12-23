import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
	res.send("Life is beautiful!");
});

app.listen(8800, () => {
	console.log("API Working!");
});

export default app;

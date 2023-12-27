"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRouter_js_1 = __importDefault(require("./routes/AuthRouter.js"));
const BookingRouter_js_1 = __importDefault(require("./routes/BookingRouter.js"));
const RestaurantRouter_js_1 = __importDefault(require("./routes/RestaurantRouter.js"));
const TableRouter_js_1 = __importDefault(require("./routes/TableRouter.js"));
mongoose_1.default
    .connect("mongodb+srv://bahct:allezlille@cluster0.swmjfyr.mongodb.net/?retryWrites=true&w=majority")
    // tslint:disable-next-line:no-console
    .then(() => console.log("Connected to MongoDB"))
    // tslint:disable-next-line:no-console
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
app.get("/health", (req, res) => {
    res.send("Life is beautiful!");
});
app.use("/auth", AuthRouter_js_1.default);
app.use("/booking", BookingRouter_js_1.default);
app.use("/restaurant", RestaurantRouter_js_1.default);
app.use("/table", TableRouter_js_1.default);
app.listen(8800, () => {
    // tslint:disable-next-line:no-console
    console.log("API Working!");
});
exports.default = app;

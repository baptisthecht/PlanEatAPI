"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDynamicData = exports.cleanup = exports.register = exports.users = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = require("../models/User.js");
const Booking_js_1 = require("../models/Booking.js");
const { sign } = jsonwebtoken_1.default;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ success: false, msg: "Missing fields" });
    const userExists = yield User_js_1.User.findOne({ email });
    if (!userExists) {
        res.status(401).json({
            success: false,
            msg: "This user doesn't exists",
        });
    }
    else {
        const passwordMatches = (0, bcrypt_1.compareSync)(password, userExists.password || "");
        if (passwordMatches) {
            const userBookings = yield Booking_js_1.Booking.find({ userId: userExists._id });
            const token = sign({
                id: userExists._id,
                email: userExists.email,
                firstName: userExists.first_name,
                lastName: userExists.last_name,
                bookings: userBookings,
            }, process.env.JWT_SECRET || "");
            res.status(200).json({ success: true, user: userExists, token });
        }
        else {
            res.status(401).json({ success: false, msg: "Wrong password" });
        }
    }
});
exports.login = login;
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_js_1.User.find();
    res.status(200).json({ success: true, users });
});
exports.users = users;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
        return res.status(400).json({ success: false, msg: "Missing fields" });
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const hashedPassword = (0, bcrypt_1.hashSync)(password, salt);
    const user = yield User_js_1.User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        balance: 0,
    });
    res.status(201).json({ success: true, user });
});
exports.register = register;
const cleanup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_js_1.User.deleteMany();
    res.status(200).json({ success: true, users });
});
exports.cleanup = cleanup;
const getUserDynamicData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield User_js_1.User.findById(id);
    res.status(200).json({ success: true, balance: user === null || user === void 0 ? void 0 : user.balance });
});
exports.getUserDynamicData = getUserDynamicData;

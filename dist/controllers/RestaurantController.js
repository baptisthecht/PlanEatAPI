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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.destroy = exports.update = exports.getOne = exports.getAll = exports.store = void 0;
const Restaurant_1 = require("../models/Restaurant");
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, city, phone } = req.body;
    const restaurant = new Restaurant_1.Restaurant({
        name,
        address,
        city,
        phone,
    });
    try {
        yield restaurant.save();
        res.send("Restaurant added");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.store = store;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield Restaurant_1.Restaurant.find();
    res.status(200).json({ success: true, restaurants });
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findById(req.params.id);
    res.status(200).json({ success: true, restaurant });
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, city, phone } = req.body;
    const restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(req.params.id, {
        name,
        address,
        city,
        phone,
    });
    res.status(200).json({ success: true, restaurant });
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, restaurant });
});
exports.destroy = destroy;
const cleanup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield Restaurant_1.Restaurant.deleteMany();
    res.status(200).json({ success: true, restaurants });
});
exports.cleanup = cleanup;

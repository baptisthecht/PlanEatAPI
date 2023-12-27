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
exports.getTablesByRestaurantId = exports.cleanup = exports.destroy = exports.update = exports.getOne = exports.getAll = exports.store = void 0;
const Restaurant_1 = require("../models/Restaurant");
const Table_1 = require("../models/Table");
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, capacity, name } = req.body;
    const table = new Table_1.Table({
        restaurantId,
        capacity,
        name,
    });
    try {
        yield table.save();
        res.send("Table added");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.store = store;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer toutes les tables
        const tables = yield Table_1.Table.find();
        // Récupérer les détails du restaurant pour chaque table
        const tablesWithRestaurantDetails = yield Promise.all(tables.map((table) => __awaiter(void 0, void 0, void 0, function* () {
            const restaurant = yield Restaurant_1.Restaurant.findById(table.restaurantId);
            return Object.assign(Object.assign({}, table.toObject()), { restaurantName: restaurant
                    ? restaurant.name
                    : "Unknown Restaurant" });
        })));
        res.status(200).json({
            success: true,
            tables: tablesWithRestaurantDetails,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer une table par son ID
        const table = yield Table_1.Table.findById(req.params.id);
        if (!table) {
            return res
                .status(404)
                .json({ success: false, error: "Table not found" });
        }
        // Récupérer les détails du restaurant pour la table
        const restaurant = yield Restaurant_1.Restaurant.findById(table.restaurantId);
        // Ajouter le nom du restaurant à l'objet de la table
        const tableWithRestaurantDetails = Object.assign(Object.assign({}, table.toObject()), { restaurantName: restaurant ? restaurant.name : "Unknown Restaurant" });
        res.status(200).json({
            success: true,
            table: tableWithRestaurantDetails,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, capacity, name } = req.body;
    const table = yield Table_1.Table.findByIdAndUpdate(req.params.id, {
        restaurantId,
        capacity,
        name,
    });
    res.status(200).json({ success: true, table });
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield Table_1.Table.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, table });
});
exports.destroy = destroy;
const cleanup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tables = yield Table_1.Table.deleteMany();
    res.status(200).json({ success: true, tables });
});
exports.cleanup = cleanup;
const getTablesByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield Table_1.Table.find({ restaurantId: req.params.id });
        const tablesWithRestaurantDetails = yield Promise.all(tables.map((table) => __awaiter(void 0, void 0, void 0, function* () {
            const restaurant = yield Restaurant_1.Restaurant.findById(table.restaurantId);
            return Object.assign(Object.assign({}, table.toObject()), { restaurantName: restaurant
                    ? restaurant.name
                    : "Unknown Restaurant" });
        })));
        res.status(200).json({
            success: true,
            tables: tablesWithRestaurantDetails,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
});
exports.getTablesByRestaurantId = getTablesByRestaurantId;

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
exports.updateStatus = exports.getAvaliabitiesByDateAndRestaurant = exports.getBookingsByUserAndStatus = exports.getBookingsByRestaurant = exports.getBookingsByUser = exports.destroy = exports.update = exports.getOne = exports.getAll = exports.store = void 0;
const Booking_1 = require("../models/Booking");
const Restaurant_1 = require("../models/Restaurant");
const Table_1 = require("../models/Table");
const Time_1 = require("../models/Time");
const User_1 = require("../models/User");
function isTimeBetween(startTime, endTime, targetTime, averageTime) {
    const format = "HH:mm"; // Assuming the time format is in hours and minutes
    const startDateTime = new Date(`2000-01-01 ${startTime}`);
    const endDateTime = new Date(`2000-01-01 ${endTime}`);
    const targetDateTime = new Date(`2000-01-01 ${targetTime}`);
    // Adjust the end time by subtracting the average time
    endDateTime.setMinutes(endDateTime.getMinutes() - averageTime);
    return targetDateTime >= startDateTime && targetDateTime <= endDateTime;
}
function isTimeBetweenWithDelta(startTime, endTime, targetTime, averageTime) {
    const format = "HH:mm"; // Assuming the time format is in hours and minutes
    const startDateTime = new Date(`2000-01-01 ${startTime}`);
    const endDateTime = new Date(`2000-01-01 ${endTime}`);
    const targetDateTime = new Date(`2000-01-01 ${targetTime}`);
    const adjustedStartDateTime = new Date(`2000-01-01 ${startTime}`);
    adjustedStartDateTime.setMinutes(adjustedStartDateTime.getMinutes() - averageTime);
    return (targetDateTime >= adjustedStartDateTime && targetDateTime <= endDateTime);
}
const getAvaliabities = (restaurandId, bookingDate, numberOfPeople) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // Get all times from database
    const times = yield Time_1.Time.find();
    // Get restaurant
    const restaurantId = restaurandId;
    const restaurant = yield Restaurant_1.Restaurant.findById(restaurantId);
    // 658b0afffe73da8953a9cb18
    // Get today day name
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    // Get today restaurant times
    const restaurantMorningOpeningTime = (_c = (_b = (_a = restaurant === null || restaurant === void 0 ? void 0 : restaurant.openingHours) === null || _a === void 0 ? void 0 : _a[today.toLowerCase()]) === null || _b === void 0 ? void 0 : _b.morning) === null || _c === void 0 ? void 0 : _c.openTime;
    const restaurantMorningClosingTime = (_f = (_e = (_d = restaurant === null || restaurant === void 0 ? void 0 : restaurant.openingHours) === null || _d === void 0 ? void 0 : _d[today.toLowerCase()]) === null || _e === void 0 ? void 0 : _e.morning) === null || _f === void 0 ? void 0 : _f.closeTime;
    const restaurantAfternoonOpeningTime = (_j = (_h = (_g = restaurant === null || restaurant === void 0 ? void 0 : restaurant.openingHours) === null || _g === void 0 ? void 0 : _g[today.toLowerCase()]) === null || _h === void 0 ? void 0 : _h.afternoon) === null || _j === void 0 ? void 0 : _j.openTime;
    const restauranAfternoonClosingTime = (_m = (_l = (_k = restaurant === null || restaurant === void 0 ? void 0 : restaurant.openingHours) === null || _k === void 0 ? void 0 : _k[today.toLowerCase()]) === null || _l === void 0 ? void 0 : _l.afternoon) === null || _m === void 0 ? void 0 : _m.closeTime;
    // Get average time
    const averageTime = restaurant === null || restaurant === void 0 ? void 0 : restaurant.averageTime;
    // Filter times by restaurant opening hours
    const filteredTimes = times.filter((time) => (restaurantMorningClosingTime &&
        restaurantMorningOpeningTime &&
        restauranAfternoonClosingTime &&
        restaurantAfternoonOpeningTime &&
        time.displayTime &&
        isTimeBetween(restaurantMorningOpeningTime, restaurantMorningClosingTime, time.displayTime, averageTime)) ||
        isTimeBetween(restaurantAfternoonOpeningTime, restauranAfternoonClosingTime, time.displayTime, averageTime));
    // Lisiting tables and check if one is available on each time, then edit filteredTimes adding new property isAvailable
    const tables = yield Table_1.Table.find({ restaurantId: restaurantId });
    const targetDate = new Date(bookingDate);
    targetDate.setHours(0, 0, 0, 0);
    const targetDatePlusOne = new Date(bookingDate);
    targetDatePlusOne.setDate(targetDate.getDate() + 1);
    targetDatePlusOne.setHours(0, 0, 0, 0);
    // create matrix of tables and times
    let matrix = [];
    for (let i = 0; i < tables.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < filteredTimes.length; j++) {
            matrix[i][j] = {
                tableId: tables[i]._id,
                timeId: filteredTimes[j]._id,
                isAvailable: true,
            };
        }
    }
    // set isAvailable to false if table is booked
    const bookings = yield Booking_1.Booking.find({
        bookingDate: {
            $gte: targetDate,
            $lt: targetDatePlusOne,
        },
    });
    for (let i = 0; i < bookings.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            for (let k = 0; k < matrix[j].length; k++) {
                // Check if its the same table and the time is between the booking time and the release time
                for (const tableId of bookings[i].tableIds) {
                    const bookingTableId = tableId.toString();
                    if (bookingTableId == matrix[j][k].tableId &&
                        isTimeBetweenWithDelta(bookings[i].bookingDate.getHours() -
                            1 +
                            ":" +
                            bookings[i].bookingDate.getMinutes(), bookings[i].releaseTime.getHours() -
                            1 +
                            ":" +
                            bookings[i].releaseTime.getMinutes(), filteredTimes[k].displayTime, averageTime)) {
                        matrix[j][k].isAvailable = false;
                    }
                }
            }
        }
    }
    // Create a new array with every time and the number of available tables
    let filteredTimes2 = [];
    for (let i = 0; i < filteredTimes.length; i++) {
        let numberOfAvailableTables = 0;
        let availableTablesIds = [];
        let availablePlaces = 0;
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[j][i].isAvailable) {
                numberOfAvailableTables++;
                availableTablesIds.push(matrix[j][i].tableId);
                availablePlaces = availablePlaces + tables[j].capacity;
            }
        }
        filteredTimes2.push({
            displayTime: filteredTimes[i].displayTime,
            numberOfAvailableTables: numberOfAvailableTables,
            availableTablesIds,
            availablePlaces,
            isAvailable: availablePlaces >= numberOfPeople,
        });
    }
    // Return filtered times
    return filteredTimes2;
});
const updateStatusByBookingId = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedBooking = yield Booking_1.Booking.findOneAndUpdate({
        _id: bookingId,
    }, {
        status: status,
    });
    if (!updatedBooking)
        return "Not found";
    if (status == "confirmed" &&
        updatedBooking.referedUserId &&
        !updatedBooking.referedUserPaid) {
        const user = yield User_1.User.findById(updatedBooking.referedUserId);
        if (user && user.balance) {
            user.balance = user.balance + 50;
            yield user.save();
            yield Booking_1.Booking.findOneAndUpdate({
                _id: bookingId,
            }, {
                referedUserPaid: true,
            });
        }
    }
    return updatedBooking;
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, userId, bookingDate, numberOfPeople, referedUserId } = req.body;
    if (!restaurantId || !userId || !bookingDate || !numberOfPeople)
        return res
            .status(400)
            .json({ success: false, message: "Missing data" });
    // Check if restaurant exists
    const restaurant = yield Restaurant_1.Restaurant.findById(restaurantId);
    if (!restaurant)
        return res
            .status(400)
            .json({ success: false, message: "Restaurant not found" });
    // Get an available table
    const date = new Date(bookingDate);
    const times = yield getAvaliabities(restaurantId, date, numberOfPeople);
    // Check if the date hour has an available table
    let isAvailableTime = false;
    let selectedTime = null;
    for (const time of times) {
        const t = new Date(`2000-01-01 ${time.displayTime}`);
        t.setHours(t.getHours() + 1);
        if (t.getHours() == date.getHours() &&
            t.getMinutes() == date.getMinutes() &&
            time.isAvailable === true) {
            isAvailableTime = true;
            selectedTime = time;
        }
    }
    if (!isAvailableTime)
        return res.status(400).json({
            success: false,
            message: "No available tables at this time",
        });
    let selectedTablesIds = [];
    for (const tableId of selectedTime.availableTablesIds) {
        const table = yield Table_1.Table.findById(tableId);
        if (table && table.capacity == numberOfPeople) {
            selectedTablesIds.push(tableId);
            break;
        }
    }
    if (selectedTablesIds.length == 0) {
        for (const tableId of selectedTime.availableTablesIds) {
            const table = yield Table_1.Table.findById(tableId);
            if (table && table.capacity >= numberOfPeople) {
                selectedTablesIds.push(tableId);
                break;
            }
        }
    }
    let totalCapacity = 0;
    if (selectedTablesIds.length == 0) {
        for (const tableId of selectedTime.availableTablesIds) {
            const table = yield Table_1.Table.findById(tableId);
            if (totalCapacity <= numberOfPeople) {
                selectedTablesIds.push(tableId);
                totalCapacity = totalCapacity + table.capacity;
            }
            else {
                break;
            }
        }
    }
    // Booking each table
    let bookingIds = [];
    let dateplusaverage = date.getTime();
    if (restaurant.averageTime) {
        dateplusaverage = dateplusaverage + restaurant.averageTime * 60000;
    }
    const booking = new Booking_1.Booking({
        tableIds: selectedTablesIds,
        userId,
        referedUserId: referedUserId ? referedUserId : null,
        bookingDate: date,
        numberOfPeople,
        releaseTime: new Date(dateplusaverage),
        multiple: selectedTablesIds.length > 1,
        restaurantId,
        restaurantData: {
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
        },
    });
    yield booking.save();
    return res.status(200).json({
        success: true,
        bookingInfos: {
            bookingId: booking._id,
            bookingDate: booking.bookingDate,
            numberOfPeople: booking.numberOfPeople,
            releaseTime: booking.releaseTime,
            restaurantId: booking.restaurantId,
        },
    });
});
exports.store = store;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield Booking_1.Booking.find();
    res.status(200).json({ success: true, bookings });
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        return res.status(400).json({ success: false, message: "Missing id" });
    const booking = yield Booking_1.Booking.findById(req.params.id);
    res.status(200).json({ success: true, booking });
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tableId, userId, bookingDate, numberOfPeople, releaseTime } = req.body;
    if (!tableId || !userId || !bookingDate || !numberOfPeople || !releaseTime)
        return res
            .status(400)
            .json({ success: false, message: "Missing data" });
    const bookingToUpdate = yield Booking_1.Booking.findByIdAndUpdate(req.params.id, {
        tableId,
        userId,
        bookingDate,
        numberOfPeople,
        releaseTime,
    });
    return res.status(200).json({ success: true, bookingToUpdate });
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        return res.status(400).json({ success: false, message: "Missing id" });
    const booking = yield Booking_1.Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, booking });
});
exports.destroy = destroy;
const getBookingsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    if (!userId)
        return res.status(400).json({ success: false, message: "Missing id" });
    const bookings = yield Booking_1.Booking.find({ userId: userId });
    res.status(200).json({ success: true, bookings: bookings.reverse() });
});
exports.getBookingsByUser = getBookingsByUser;
const getBookingsByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantId = req.body.restaurantId;
    if (!restaurantId)
        return res.status(400).json({ success: false, message: "Missing id" });
    const bookings = yield Booking_1.Booking.find({ restaurantId: restaurantId });
    res.status(200).json({ success: true, bookings });
});
exports.getBookingsByRestaurant = getBookingsByRestaurant;
const getBookingsByUserAndStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const status = req.body.status;
    if (!userId || !status)
        return res
            .status(400)
            .json({ success: false, message: "Missing data" });
    const bookings = yield Booking_1.Booking.find({
        userId: userId,
        status: status,
    });
    res.status(200).json({ success: true, bookings });
});
exports.getBookingsByUserAndStatus = getBookingsByUserAndStatus;
const getAvaliabitiesByDateAndRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const times = yield getAvaliabities(req.body.restaurantId, req.body.bookingDate, req.body.numberOfPeople);
    // Return filtered times
    res.status(200).json({ success: true, times });
});
exports.getAvaliabitiesByDateAndRestaurant = getAvaliabitiesByDateAndRestaurant;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, status } = req.body;
    if (!bookingId || !status)
        return res
            .status(400)
            .json({ success: false, message: "Missing data" });
    const update = yield updateStatusByBookingId(bookingId, status);
    if (update == "Not found")
        return res.status(400).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, update });
});
exports.updateStatus = updateStatus;

import { Booking } from "../models/Booking";
import { Restaurant } from "../models/Restaurant";
import { Table } from "../models/Table";
import { Time } from "../models/Time";
import { User } from "../models/User";

function isTimeBetween(
	startTime: any,
	endTime: any,
	targetTime: any,
	averageTime: any
) {
	const format = "HH:mm"; // Assuming the time format is in hours and minutes

	const startDateTime = new Date(`2000-01-01 ${startTime}`);
	const endDateTime = new Date(`2000-01-01 ${endTime}`);
	const targetDateTime = new Date(`2000-01-01 ${targetTime}`);

	// Adjust the end time by subtracting the average time
	endDateTime.setMinutes(endDateTime.getMinutes() - averageTime);
	return targetDateTime >= startDateTime && targetDateTime <= endDateTime;
}

function isTimeBetweenWithDelta(
	startTime: any,
	endTime: any,
	targetTime: any,
	averageTime: any
) {
	const format = "HH:mm"; // Assuming the time format is in hours and minutes

	const startDateTime = new Date(`2000-01-01 ${startTime}`);
	const endDateTime = new Date(`2000-01-01 ${endTime}`);
	const targetDateTime = new Date(`2000-01-01 ${targetTime}`);
	const adjustedStartDateTime = new Date(`2000-01-01 ${startTime}`);
	adjustedStartDateTime.setMinutes(
		adjustedStartDateTime.getMinutes() - averageTime
	);
	return (
		targetDateTime >= adjustedStartDateTime && targetDateTime <= endDateTime
	);
}

const getAvaliabities = async (
	restaurandId: any,
	bookingDate: any,
	numberOfPeople: number
) => {
	// Get all times from database
	const times = await Time.find();
	// Get restaurant

	const restaurantId = restaurandId;
	const restaurant = await Restaurant.findById(restaurantId);
	// 658b0afffe73da8953a9cb18

	// Get today day name
	const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
	// Get today restaurant times
	const restaurantMorningOpeningTime =
		restaurant?.openingHours?.[
			today.toLowerCase() as keyof typeof restaurant.openingHours
		]?.morning?.openTime;
	const restaurantMorningClosingTime =
		restaurant?.openingHours?.[
			today.toLowerCase() as keyof typeof restaurant.openingHours
		]?.morning?.closeTime;
	const restaurantAfternoonOpeningTime =
		restaurant?.openingHours?.[
			today.toLowerCase() as keyof typeof restaurant.openingHours
		]?.afternoon?.openTime;
	const restauranAfternoonClosingTime =
		restaurant?.openingHours?.[
			today.toLowerCase() as keyof typeof restaurant.openingHours
		]?.afternoon?.closeTime;
	// Get average time
	const averageTime = restaurant?.averageTime;
	// Filter times by restaurant opening hours
	const filteredTimes = times.filter(
		(time) =>
			(restaurantMorningClosingTime &&
				restaurantMorningOpeningTime &&
				restauranAfternoonClosingTime &&
				restaurantAfternoonOpeningTime &&
				time.displayTime &&
				isTimeBetween(
					restaurantMorningOpeningTime,
					restaurantMorningClosingTime,
					time.displayTime,
					averageTime
				)) ||
			isTimeBetween(
				restaurantAfternoonOpeningTime,
				restauranAfternoonClosingTime,
				time.displayTime,
				averageTime
			)
	);
	// Lisiting tables and check if one is available on each time, then edit filteredTimes adding new property isAvailable
	const tables = await Table.find({ restaurantId: restaurantId });

	const targetDate = new Date(bookingDate);
	targetDate.setHours(0, 0, 0, 0);

	const targetDatePlusOne = new Date(bookingDate);
	targetDatePlusOne.setDate(targetDate.getDate() + 1);
	targetDatePlusOne.setHours(0, 0, 0, 0);

	// create matrix of tables and times
	let matrix: any = [];
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
	const bookings = await Booking.find({
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
					if (
						bookingTableId == matrix[j][k].tableId &&
						isTimeBetweenWithDelta(
							bookings[i].bookingDate.getHours() -
								1 +
								":" +
								bookings[i].bookingDate.getMinutes(),
							bookings[i].releaseTime.getHours() -
								1 +
								":" +
								bookings[i].releaseTime.getMinutes(),
							filteredTimes[k].displayTime,
							averageTime
						)
					) {
						matrix[j][k].isAvailable = false;
					}
				}
			}
		}
	}

	// Create a new array with every time and the number of available tables

	let filteredTimes2: any = [];
	for (let i = 0; i < filteredTimes.length; i++) {
		let numberOfAvailableTables = 0;
		let availableTablesIds: any = [];
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
};

const updateStatusByBookingId = async (bookingId: any, status: any) => {
	let updatedBooking = await Booking.findOneAndUpdate(
		{
			_id: bookingId,
		},
		{
			status: status,
		}
	);
	if (!updatedBooking) return "Not found";
	if (
		status == "confirmed" &&
		updatedBooking.referedUserId &&
		!updatedBooking.referedUserPaid
	) {
		const user = await User.findById(updatedBooking.referedUserId);
		if (user && user.balance) {
			user.balance = user.balance + 50;
			await user.save();
			let updatedPaidBooking = await Booking.findOneAndUpdate(
				{
					_id: bookingId,
				},
				{
					referedUserPaid: true,
				}
			);
		}
	}

	return updatedBooking;
};

export const store = async (req: any, res: any) => {
	const { restaurantId, userId, bookingDate, numberOfPeople, referedUserId } =
		req.body;
	if (!restaurantId || !userId || !bookingDate || !numberOfPeople)
		return res
			.status(400)
			.json({ success: false, message: "Missing data" });

	// Check if restaurant exists
	const restaurant = await Restaurant.findById(restaurantId);
	if (!restaurant)
		return res
			.status(400)
			.json({ success: false, message: "Restaurant not found" });

	// Get an available table
	const date = new Date(bookingDate);
	const times = await getAvaliabities(restaurantId, date, numberOfPeople);
	// Check if the date hour has an available table
	let isAvailableTime = false;
	let selectedTime = null;
	for (const time of times) {
		const t = new Date(`2000-01-01 ${time.displayTime}`);
		t.setHours(t.getHours() + 1);
		if (
			t.getHours() == date.getHours() &&
			t.getMinutes() == date.getMinutes() &&
			time.isAvailable === true
		) {
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
		const table = await Table.findById(tableId);
		if (table && table.capacity == numberOfPeople) {
			selectedTablesIds.push(tableId);
			break;
		}
	}
	if (selectedTablesIds.length == 0) {
		for (const tableId of selectedTime.availableTablesIds) {
			const table = await Table.findById(tableId);
			if (table && table.capacity >= numberOfPeople) {
				selectedTablesIds.push(tableId);
				break;
			}
		}
	}
	let totalCapacity = 0;
	if (selectedTablesIds.length == 0) {
		for (const tableId of selectedTime.availableTablesIds) {
			const table = await Table.findById(tableId);
			if (totalCapacity <= numberOfPeople) {
				selectedTablesIds.push(tableId);
				totalCapacity = totalCapacity + table!.capacity;
			} else {
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

	const booking = new Booking({
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
	await booking.save();

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
};

export const getAll = async (req: any, res: any) => {
	const bookings = await Booking.find();
	res.status(200).json({ success: true, bookings });
};

export const getOne = async (req: any, res: any) => {
	if (!req.params.id)
		return res.status(400).json({ success: false, message: "Missing id" });
	const booking = await Booking.findById(req.params.id);
	res.status(200).json({ success: true, booking });
};

export const update = async (req: any, res: any) => {
	const { tableId, userId, bookingDate, numberOfPeople, releaseTime } =
		req.body;
	if (!tableId || !userId || !bookingDate || !numberOfPeople || !releaseTime)
		return res
			.status(400)
			.json({ success: false, message: "Missing data" });
	const bookingToUpdate = await Booking.findByIdAndUpdate(req.params.id, {
		tableId,
		userId,
		bookingDate,
		numberOfPeople,
		releaseTime,
	});
	return res.status(200).json({ success: true, bookingToUpdate });
};

export const destroy = async (req: any, res: any) => {
	if (!req.params.id)
		return res.status(400).json({ success: false, message: "Missing id" });
	const booking = await Booking.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, booking });
};

export const getBookingsByUser = async (req: any, res: any) => {
	const userId = req.body.userId;
	if (!userId)
		return res.status(400).json({ success: false, message: "Missing id" });
	const bookings = await Booking.find({ userId: userId });
	res.status(200).json({ success: true, bookings });
};

export const getBookingsByRestaurant = async (req: any, res: any) => {
	const restaurantId = req.body.restaurantId;
	if (!restaurantId)
		return res.status(400).json({ success: false, message: "Missing id" });
	const bookings = await Booking.find({ restaurantId: restaurantId });
	res.status(200).json({ success: true, bookings });
};

export const getBookingsByUserAndStatus = async (req: any, res: any) => {
	const userId = req.body.userId;
	const status = req.body.status;
	if (!userId || !status)
		return res
			.status(400)
			.json({ success: false, message: "Missing data" });
	const bookings = await Booking.find({
		userId: userId,
		status: status,
	});
	res.status(200).json({ success: true, bookings });
};

export const getAvaliabitiesByDateAndRestaurant = async (
	req: any,
	res: any
) => {
	const times = await getAvaliabities(
		req.body.restaurantId,
		req.body.bookingDate,
		req.body.numberOfPeople
	);

	// Return filtered times
	res.status(200).json({ success: true, times });
};

export const updateStatus = async (req: any, res: any) => {
	const { bookingId, status } = req.body;
	if (!bookingId || !status)
		return res
			.status(400)
			.json({ success: false, message: "Missing data" });
	const update = await updateStatusByBookingId(bookingId, status);
	if (update == "Not found")
		return res.status(400).json({ success: false, message: "Not found" });
	res.status(200).json({ success: true, update });
};

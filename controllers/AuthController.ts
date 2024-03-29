import { compareSync, hashSync, genSaltSync } from "bcrypt";
import pkg from "jsonwebtoken";
import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";

const { sign } = pkg;

export const login = async (req: any, res: any) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ success: false, msg: "Missing fields" });
	const userExists = await User.findOne({ email });
	if (!userExists) {
		res.status(401).json({
			success: false,
			msg: "This user doesn't exists",
		});
	} else {
		const passwordMatches = compareSync(
			password,
			userExists.password || ""
		);
		if (passwordMatches) {
			const userBookings = await Booking.find({ userId: userExists._id });
			const token = sign(
				{
					id: userExists._id,
					email: userExists.email,
					firstName: userExists.first_name,
					lastName: userExists.last_name,
					bookings: userBookings,
				},
				process.env.JWT_SECRET || ""
			);
			res.status(200).json({ success: true, user: userExists, token });
		} else {
			res.status(401).json({ success: false, msg: "Wrong password" });
		}
	}
};

export const users = async (req: any, res: any) => {
	const users = await User.find();
	res.status(200).json({ success: true, users });
};

export const register = async (req: any, res: any) => {
	const { first_name, last_name, email, password } = req.body;
	if (!first_name || !last_name || !email || !password)
		return res.status(400).json({ success: false, msg: "Missing fields" });
	const salt = genSaltSync(10);
	const hashedPassword = hashSync(password, salt);
	const user = await User.create({
		first_name,
		last_name,
		email,
		password: hashedPassword,
		balance: 0,
	});
	res.status(201).json({ success: true, user });
};

export const cleanup = async (req: any, res: any) => {
	const users = await User.deleteMany();
	res.status(200).json({ success: true, users });
};

export const getUserDynamicData = async (req: any, res: any) => {
	const { userId } = req.body;
	const user = await User.findById(userId);
	res.status(200).json({ success: true, balance: user?.balance });
};

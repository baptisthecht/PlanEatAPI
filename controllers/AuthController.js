import { compareSync, hashSync, genSaltSync } from "bcrypt";
import pkg from "jsonwebtoken";
import { User } from "../models/User.js";

const { sign } = pkg;

export const login = async (req, res) => {
	const { email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (!userExists) {
		res.status(401).json({
			success: false,
			msg: "This user doesn't exists",
		});
	} else {
		const passwordMatches = compareSync(password, userExists.password);
		if (passwordMatches) {
			const token = sign(
				{ email: userExists.email },
				process.env.JWT_SECRET
			);
			res.status(200).json({ success: true, user: userExists, token });
		} else {
			res.status(401).json({ success: false, msg: "Wrong password" });
		}
	}
};

export const users = async (req, res) => {
	const users = await User.find();
	res.status(200).json({ success: true, users });
};

export const register = async (req, res) => {
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
	});
	res.status(201).json({ success: true, user: user });
};

export const cleanup = async (req, res) => {
	const users = await User.deleteMany();
	res.status(200).json({ success: true, users });
};

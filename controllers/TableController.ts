import { Restaurant } from "../models/Restaurant";
import { Table } from "../models/Table";

export const store = async (req: any, res: any) => {
	const { restaurantId, capacity, name } = req.body;
	const table = new Table({
		restaurantId,
		capacity,
		name,
	});
	try {
		await table.save();
		res.send("Table added");
	} catch (err) {
		res.status(500).send(err);
	}
};

export const getAll = async (req: any, res: any) => {
	try {
		// Récupérer toutes les tables
		const tables = await Table.find();

		// Récupérer les détails du restaurant pour chaque table
		const tablesWithRestaurantDetails = await Promise.all(
			tables.map(async (table) => {
				const restaurant = await Restaurant.findById(
					table.restaurantId
				);
				return {
					...table.toObject(),
					restaurantName: restaurant
						? restaurant.name
						: "Unknown Restaurant",
				};
			})
		);

		res.status(200).json({
			success: true,
			tables: tablesWithRestaurantDetails,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: "Internal Server Error",
		});
	}
};

export const getOne = async (req: any, res: any) => {
	try {
		// Récupérer une table par son ID
		const table = await Table.findById(req.params.id);

		if (!table) {
			return res
				.status(404)
				.json({ success: false, error: "Table not found" });
		}

		// Récupérer les détails du restaurant pour la table
		const restaurant = await Restaurant.findById(table.restaurantId);

		// Ajouter le nom du restaurant à l'objet de la table
		const tableWithRestaurantDetails = {
			...table.toObject(),
			restaurantName: restaurant ? restaurant.name : "Unknown Restaurant",
		};

		res.status(200).json({
			success: true,
			table: tableWithRestaurantDetails,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: "Internal Server Error",
		});
	}
};

export const update = async (req: any, res: any) => {
	const { restaurantId, capacity, name } = req.body;
	const table = await Table.findByIdAndUpdate(req.params.id, {
		restaurantId,
		capacity,
		name,
	});
	res.status(200).json({ success: true, table });
};

export const destroy = async (req: any, res: any) => {
	const table = await Table.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, table });
};

export const cleanup = async (req: any, res: any) => {
	const tables = await Table.deleteMany();
	res.status(200).json({ success: true, tables });
};

export const getTablesByRestaurantId = async (req: any, res: any) => {
	try {
		const tables = await Table.find({ restaurantId: req.params.id });
		const tablesWithRestaurantDetails = await Promise.all(
			tables.map(async (table) => {
				const restaurant = await Restaurant.findById(
					table.restaurantId
				);
				return {
					...table.toObject(),
					restaurantName: restaurant
						? restaurant.name
						: "Unknown Restaurant",
				};
			})
		);

		res.status(200).json({
			success: true,
			tables: tablesWithRestaurantDetails,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: "Internal Server Error",
		});
	}
};

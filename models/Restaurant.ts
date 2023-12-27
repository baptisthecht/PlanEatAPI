import mongoose, { Schema, Document } from "mongoose";

const RestaurantSchema = new Schema({
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	city: {
		type: String,
	},
	phone: {
		type: String,
	},
	openingHours: {
		monday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		tuesday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		wednesday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		thursday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		friday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		saturday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
		sunday: {
			morning: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
			afternoon: {
				opened: {
					type: Boolean,
				},
				openTime: {
					type: String,
				},
				closeTime: {
					type: String,
				},
			},
		},
	},
	averageTime: {
		type: Number,
	},
});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

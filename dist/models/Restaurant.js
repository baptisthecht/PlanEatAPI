"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RestaurantSchema = new mongoose_1.Schema({
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
exports.Restaurant = mongoose_1.default.model("Restaurant", RestaurantSchema);

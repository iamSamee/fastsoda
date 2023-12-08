"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const foodSchema = new mongoose_1.default.Schema({
    vendorId: { type: String },
    name: { required: true, type: String },
    description: { required: true, type: String },
    category: { type: String },
    foodType: { required: true, type: String },
    readyTime: { required: true, type: Number },
    price: { required: true, type: String },
    rating: { type: Number },
    images: { type: [String] },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});
const Food = mongoose_1.default.model('Food', foodSchema);
exports.Food = Food;
//# sourceMappingURL=food.js.map
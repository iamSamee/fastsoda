"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vendorSchema = new mongoose_1.default.Schema({
    name: { required: true, type: String },
    ownerName: { required: true, type: String },
    foodTypes: { type: [String] },
    pincode: { required: true, type: String },
    address: { type: String },
    phone: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    salt: { required: true, type: String },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    foods: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: 'Food'
        }],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});
const Vendor = mongoose_1.default.model('Vendor', vendorSchema);
exports.Vendor = Vendor;
//# sourceMappingURL=vendor.js.map
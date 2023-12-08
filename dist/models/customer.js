"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    email: { required: true, type: String },
    password: { required: true, type: String },
    salt: { required: true, type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { required: true, type: String },
    verified: { required: true, type: Boolean },
    otp: { required: true, type: Number },
    otpExpiry: { required: true, type: Date },
    lat: { type: Number },
    lng: { type: Number },
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
const Customer = mongoose_1.default.model('Customer', customerSchema);
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map
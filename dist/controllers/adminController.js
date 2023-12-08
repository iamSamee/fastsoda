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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const mongoose_1 = __importDefault(require("mongoose"));
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, foodType, pincode, address, phone, email, password } = req.body;
    const existingVendor = yield models_1.Vendor.findOne({ email: email });
    if (existingVendor) {
        return res.json({ message: 'A vendor with same email already exist' });
    }
    ;
    const salt = yield (0, utility_1.generateSalt)();
    const hashedPw = yield (0, utility_1.generatePassword)(password, salt);
    const createdVendor = yield models_1.Vendor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: hashedPw,
        salt: salt,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: []
    });
    return res.json({ createdVendor });
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield models_1.Vendor.find({});
    if (!vendors) {
        return res.json({ messgae: "No Vendor data Found!" });
    }
    return res.json({ vendors: vendors });
});
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = new mongoose_1.default.Types.ObjectId(req.params.id);
    console.log(vendorId);
    const vendor = yield models_1.Vendor.findById(vendorId);
    if (!vendor) {
        return res.json({ message: "No vendor exist with this Id!!!" });
    }
    return res.json({ vendor: vendor });
});
exports.getVendorById = getVendorById;
//# sourceMappingURL=adminController.js.map
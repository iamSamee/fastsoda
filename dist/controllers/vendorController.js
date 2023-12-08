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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoods = exports.addFood = exports.updateVendorService = exports.updateVendorProfile = exports.updateVendorCoverImage = exports.getVendorProfile = exports.vendorLogin = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const vendor = yield models_1.Vendor.findOne({ email: email });
    if (!vendor) {
        return res.json({ message: "Vendor with this email doesn't exist!" });
    }
    const validation = yield (0, utility_1.validatePassword)(password, vendor.password, vendor.salt);
    if (!validation) {
        return res.json({ message: "Incorrect credentials!" });
    }
    const token = (0, utility_1.generateToken)({
        _id: vendor._id,
        email: vendor.email,
        name: vendor.name,
        foodTypes: vendor.foodTypes,
    });
    return res.json({ vendor: vendor, token: token });
});
exports.vendorLogin = vendorLogin;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.json({ message: "Vendor Information Not Found" });
    }
    const vendor = yield models_1.Vendor.findById({ _id: user._id });
    return res.json({ vendor: vendor });
});
exports.getVendorProfile = getVendorProfile;
const updateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield models_1.Vendor.findById({ _id: user._id });
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vendor.coverImages.push(...images);
            const result = yield vendor.save();
            return res.json(result);
        }
    }
    return res.json({ message: 'Unable to update Cover Image' });
});
exports.updateVendorCoverImage = updateVendorCoverImage;
const updateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, phone, foodTypes } = req.body;
    const user = req.user;
    console.log(user);
    if (user) {
        const vendor = yield models_1.Vendor.findById({ _id: user._id });
        if (vendor !== null) {
            vendor.name = name;
            vendor.address = address;
            vendor.phone = phone;
            vendor.foodTypes = foodTypes;
            const savedResult = yield vendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to Update vendor profile ' });
});
exports.updateVendorProfile = updateVendorProfile;
const updateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        const vendor = yield models_1.Vendor.findById({ _id: user._id });
        if (vendor !== null) {
            vendor.serviceAvailable = !vendor.serviceAvailable;
            const savedResult = yield vendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to Update vendor profile ' });
});
exports.updateVendorService = updateVendorService;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const vendor = yield models_1.Vendor.findById({ _id: user._id });
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const createdFood = yield models_1.Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                price: price,
                readyTime: readyTime,
                rating: 0,
                images: images,
            });
            yield vendor.foods.push(createdFood);
            const savedResult = yield vendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to create food' });
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vendorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({ message: 'Unable to Get Foods' });
});
exports.getFoods = getFoods;
//# sourceMappingURL=vendorController.js.map
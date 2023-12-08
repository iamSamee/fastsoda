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
exports.restaurantById = exports.searchFoods = exports.getFoodsIn30Min = exports.getTopRestaurants = exports.getFoodAvailability = void 0;
const models_1 = require("../models");
const getFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .populate('foods');
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No Data Found!" });
});
exports.getFoodAvailability = getFoodAvailability;
const getTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .limit(1);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No Data Found!" });
});
exports.getTopRestaurants = getTopRestaurants;
const getFoodsIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false })
        .populate('foods');
    if (result.length > 0) {
        let foodResult = [];
        result.map(vendor => {
            const foods = vendor.foods;
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "No Data Found!" });
});
exports.getFoodsIn30Min = getFoodsIn30Min;
const searchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: false })
        .populate('foods');
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => {
            foodResult.push(...item.foods);
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "No Data Found!" });
});
exports.searchFoods = searchFoods;
const restaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vendor.findById(id).populate('foods');
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No Data Found!" });
});
exports.restaurantById = restaurantById;
//# sourceMappingURL=shoppingController.js.map
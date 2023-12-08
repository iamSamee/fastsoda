"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.shoppingRoutes = router;
/** ---------------Food Availability------------------- */
router.get('/:pincode', controllers_1.getFoodAvailability);
/** ---------------Top Restaurants------------------- */
router.get('/top-restaurants/:pincode', controllers_1.getTopRestaurants);
/** ---------------Foods Available in 30 Minutes------------------- */
router.get('/foods-in-30-min/:pincode', controllers_1.getFoodsIn30Min);
/** ---------------Search Foods------------------- */
router.get('/search/:pincode', controllers_1.searchFoods);
/** ---------------Find Restaurant By ID------------------- */
router.get('/restaurant/:pincode', controllers_1.restaurantById);
//# sourceMappingURL=shoppingRoutes.js.map
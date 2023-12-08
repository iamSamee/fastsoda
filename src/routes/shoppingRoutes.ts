import express, { Request, Response, NextFunction } from 'express';
import { getFoodAvailability, getFoodsIn30Min, getTopRestaurants, searchFoods, restaurantById } from '../controllers';

const router = express.Router();

/** ---------------Food Availability------------------- */
router.get('/:pincode',getFoodAvailability);

/** ---------------Top Restaurants------------------- */
router.get('/top-restaurants/:pincode', getTopRestaurants);

/** ---------------Foods Available in 30 Minutes------------------- */
router.get('/foods-in-30-min/:pincode', getFoodsIn30Min);

/** ---------------Search Foods------------------- */
router.get('/search/:pincode', searchFoods);

/** ---------------Find Restaurant By ID------------------- */
router.get('/restaurant/:pincode', restaurantById);

export {router as shoppingRoutes}
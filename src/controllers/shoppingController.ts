import { Request, Response, NextFunction } from 'express';
import { Vendor, foodDoc } from '../models';


export const getFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false})
    .sort([['rating', 'descending']])
    .populate('foods');
    if(result.length > 0){
        return res.status(200).json(result);
    }
    return res.status(400).json({message: "No Data Found!"});
}

export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false})
    .sort([['rating', 'descending']])
    .limit(1);
    if(result.length > 0){
        return res.status(200).json(result);
    }
    return res.status(400).json({message: "No Data Found!"});
}

export const getFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false})
    .populate('foods');
    if(result.length > 0){
        let foodResult: any = [];
        result.map(vendor => {
            const foods = vendor.foods as [foodDoc];
            foodResult.push(...foods.filter(food => food.readyTime <= 30))
        })
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({message: "No Data Found!"});
}

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false})
    .populate('foods');
    if(result.length > 0){
        let foodResult: any = [];
        result.map(item => {
            foodResult.push(...item.foods)
        })
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({message: "No Data Found!"});
}

export const restaurantById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await Vendor.findById(id).populate('foods');
    if(result){
        return res.status(200).json(result);
    }
    return res.status(400).json({message: "No Data Found!"});
}
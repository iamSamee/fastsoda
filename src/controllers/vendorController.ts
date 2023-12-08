import { Request, Response, NextFunction } from 'express';
import { editVendorInput, vendorInputs, createFoodInput } from '../dto';
import { Food, Vendor } from '../models';
import { generateToken, validatePassword } from '../utility';





export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = <vendorInputs>req.body;

    const vendor = await Vendor.findOne({email: email});
    if(!vendor){
        return res.json({message: "Vendor with this email doesn't exist!"});
    }

    const validation = await validatePassword(password, vendor.password, vendor.salt)
    if(!validation){
        return res.json({message: "Incorrect credentials!"});
    }
    const token = generateToken({
        _id: vendor._id,
        email: vendor.email,
        name: vendor.name,
        foodTypes: vendor.foodTypes,
    })
    return res.json({vendor: vendor, token: token});
}



export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(!user){
        return res.json({ message: "Vendor Information Not Found" })
    }
    const vendor = await Vendor.findById({_id: user._id});
    return res.json({vendor: vendor});
}


export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        
        const vendor = await Vendor.findById({_id: user._id});
        
        if(vendor !== null){
            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename);

            vendor.coverImages.push(...images);
            const result = await vendor.save();
            return res.json(result);
        }
    }
    return res.json({ message: 'Unable to update Cover Image' })
}



export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, phone, foodTypes} = <editVendorInput>req.body;
    const user = req.user;
    console.log(user)
    if(user){
        const vendor = await Vendor.findById({_id: user._id});
        if(vendor !== null){
            vendor.name = name;
            vendor.address = address;
            vendor.phone = phone;
            vendor.foodTypes = foodTypes;
            
            const savedResult = await vendor.save();
            
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to Update vendor profile ' })
}


export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user)
    if(user){
        const vendor = await Vendor.findById({_id: user._id});
        if(vendor !== null){
            vendor.serviceAvailable = !vendor.serviceAvailable;
            const savedResult = await vendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to Update vendor profile ' })
}



export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    if(user){
        const {name, description, category, foodType, readyTime, price} = <createFoodInput>req.body;
        const vendor = await Vendor.findById({_id: user._id});
        if(vendor !== null){
            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename);

            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                price: price,
                readyTime: readyTime,
                rating: 0,
                images: images,
            })
            await vendor.foods.push(createdFood)
            const savedResult = await vendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ message: 'Unable to create food' })
}


export const getFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        const foods = await Food.find({vendorId: user._id})
        if(foods !== null){
            return res.json(foods);
        }
    }
    return res.json({ message: 'Unable to Get Foods' })
}
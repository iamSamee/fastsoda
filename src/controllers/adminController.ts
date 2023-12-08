import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';
import { generatePassword, generateSalt } from '../utility';
import mongoose from 'mongoose';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, ownerName, foodType, pincode, address, phone, email, password } = <createVendorInput>req.body;

    const existingVendor = await Vendor.findOne({email: email});
    if(existingVendor){
        return res.json({message: 'A vendor with same email already exist'})
    };

    const salt = await generateSalt();
    const hashedPw = await generatePassword(password, salt)

    const createdVendor = await Vendor.create({
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
    })
    return res.json({createdVendor});
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors =await Vendor.find({});
    if(!vendors){
        return res.json({messgae: "No Vendor data Found!"});
    }
    return res.json({vendors: vendors});
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = new mongoose.Types.ObjectId(req.params.id);
    
    console.log(vendorId);
    const vendor =await Vendor.findById(vendorId);

    if(!vendor){
        return res.json({message: "No vendor exist with this Id!!!"});
    }
    return res.json({vendor: vendor});
}
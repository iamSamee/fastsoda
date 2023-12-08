import mongoose from 'mongoose';

export interface foodDoc extends mongoose.Document{
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: string;
    rating: string;
    foods: [];
    images: [string];
}

const foodSchema = new mongoose.Schema({
    vendorId:  {type: String},
    name:  {required: true, type: String},
    description: {required: true, type: String},
    category: {type: String},
    foodType: {required: true, type: String},
    readyTime: {required: true, type: Number},
    price: {required: true, type: String},
    rating: {type: Number},
    images: {type: [String]},
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});

const Food = mongoose.model<foodDoc>('Food', foodSchema);

export {Food}
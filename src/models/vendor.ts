import mongoose from 'mongoose';

interface vendorDoc extends mongoose.Document{
    name: string,
    ownerName: string,
    foodTypes: [string],
    pincode: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    salt: string,
    serviceAvailable: boolean,
    coverImages: [string],
    rating: number,
    foods: any,
}

const vendorSchema = new mongoose.Schema({
    name:  {required: true, type: String},
    ownerName: {required: true, type: String},
    foodTypes: {type: [String]},
    pincode: {required: true, type: String},
    address: {type: String},
    phone: {required: true, type: String},
    email: {required: true, type: String},
    password: {required: true, type: String},
    salt: {required: true, type: String},
    serviceAvailable: {type: Boolean},
    coverImages: {type: [String]},
    rating: {type: Number},
    foods: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Food'
    }],
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});

const Vendor = mongoose.model<vendorDoc>('Vendor', vendorSchema);

export {Vendor}
import mongoose from 'mongoose';

export interface customerDoc extends mongoose.Document{
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otpExpiry: Date;
    lat: number;
    lng: number;
}

const customerSchema = new mongoose.Schema({
    email: {required: true, type: String},
    password: {required: true, type: String},
    salt: {required: true, type: String},
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String},
    phone: {required: true, type: String},
    verified: {required: true, type: Boolean},
    otp: {required: true, type: Number},
    otpExpiry: {required: true, type: Date},
    lat: {type: Number},
    lng: {type: Number},
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

const Customer = mongoose.model<customerDoc>('Customer', customerSchema);

export {Customer}
import { IsEmail, Length, IsEmpty } from 'class-validator'

export class createCustomerInputs{

    @IsEmail()
    email: string; 

    @Length(8,12)
    phone: string;

    @Length(8, 15)
    password: string;
}


export class userLoginInputs{

    @IsEmail()
    email: string; 

    @Length(8, 15)
    password: string;
}


export class editCustomerProfileInputs{

    @Length(3,12)
    firstName: string;

    @Length(3, 15)
    lastName: string;

    @Length(6, 15)
    address: string;
}

export interface customerPayload{
    _id: string;
    email : string,
    verified: boolean
}
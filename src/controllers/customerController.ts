import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { createCustomerInputs, userLoginInputs, editCustomerProfileInputs } from '../dto';
import { generateOtp, generatePassword, generateSalt, generateToken, onRequestOtp, validatePassword } from '../utility';
import { Customer } from '../models/customer';


export const customerSignup = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(createCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, {validationError: { target: true }})

    if(inputErrors.length > 0){
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password } = customerInputs;

    const salt = await generateSalt();
    const userPassword = await generatePassword(password, salt);

    
    const existingCustomer = await Customer.findOne({email});
    if(existingCustomer){
        return res.status(409).json({message: "A Customer with same email already exists!"});
    }
    

    const otp = generateOtp().otp;
    console.log(otp);
    const otpExpiry = generateOtp().expiry;
    console.log(otpExpiry);



    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        firstName: '',
        lastName: '',
        address: '',
        phone: phone,
        verified: false,
        otp: otp,
        otpExpiry: otpExpiry,
        lat: 0,
        lng: 0,
    })

    if(result){ 
        // send otp to customer
        // await onRequestOtp(otp, phone);
        
        // generate the signature
        const signature = generateToken({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });

        // send the result to the client
        return res.status(201).json({result: result, signature: signature, verified: result.verified, email: result.email});
    }
    return res.status(404).json({ message: "Error with Signup" })

} 

export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    const loginInputs = plainToClass(userLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, {validationError: { target: true }})
    if(loginErrors.length > 0){
        return res.status(400).json(loginErrors);
    }

    const { email, password } = loginInputs;

    const customer = await Customer.findOne({email});

    if(customer){
        const validation = await validatePassword(password,customer.password, customer.salt)
        if(validation){
            // generate the signature
            const signature = generateToken({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            }); 
            
            // send the result to the client
            return res.status(201).json({signature: signature, verified: customer.verified, email: customer.email});
        }
    }

    return res.status(404).json({ message: "Error with Login" })

}

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;
    const customer = req.user;
    if(customer){
        
        const profile = await Customer.findById(customer._id);
        if(profile){
            console.log(profile.otp);
            console.log(profile.otpExpiry);
            console.log(new Date());

            if(profile.otp === parseInt(otp) && profile.otpExpiry >= new Date() ){
                console.log(profile);
                profile.verified = true;
                const updatedCustomerResponse = await profile.save();

                // generate the signature
                const signature = generateToken({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });

                // send the result to the client
                return res.status(201).json({ 
                    signature: signature, 
                    verified: updatedCustomerResponse.verified, 
                    email: updatedCustomerResponse.email
                });
            }
        }
    }
    return res.status(400).json({message: "Error with OTP Validation"});
}

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer){
        const profile = await Customer.findById(customer._id);
        if (profile){
            const { otp, expiry } = generateOtp();
            profile.otp = otp;
            profile.otpExpiry = expiry;

            await profile.save();
            console.log(otp);
            // await onRequestOtp(otp, profile.phone);

            return res.status(200).json({message: "OTP sent to your Registered Phone Number"});
        }
    }
    return res.status(400).json({message: "Error with Request OTP"});

}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    
    
    if(customer){
        const profile = await Customer.findById(customer._id);
        if (profile){
            return res.status(200).json({profile: profile, message: "Profile showing successfully"});
        }
    }
    return res.status(400).json({message: "Error with Fetching Profile"});
}

export const editCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    
    const profileInputs = plainToClass( editCustomerProfileInputs, req.body);
    const profileErrors = await validate(profileInputs, {validationError: { target: true }})
    if(profileErrors.length > 0){
        return res.status(400).json(profileErrors);
    }

    const { firstName, lastName, address } = profileInputs;
    
    if(customer){
        const profile = await Customer.findById(customer._id);
        if (profile){
            
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();

            return res.status(200).json({result: result, message: "Editing Successful"});
        }
    }
    return res.status(400).json({message: "Error with Editing Profile"});
}
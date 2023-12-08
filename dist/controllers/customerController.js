"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomerProfile = exports.getCustomerProfile = exports.requestOtp = exports.customerVerify = exports.customerLogin = exports.customerSignup = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../dto");
const utility_1 = require("../utility");
const customer_1 = require("../models/customer");
const customerSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(dto_1.createCustomerInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const salt = yield (0, utility_1.generateSalt)();
    const userPassword = yield (0, utility_1.generatePassword)(password, salt);
    const existingCustomer = yield customer_1.Customer.findOne({ email });
    if (existingCustomer) {
        return res.status(409).json({ message: "A Customer with same email already exists!" });
    }
    const otp = (0, utility_1.generateOtp)().otp;
    console.log(otp);
    const otpExpiry = (0, utility_1.generateOtp)().expiry;
    console.log(otpExpiry);
    const result = yield customer_1.Customer.create({
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
    });
    if (result) {
        // send otp to customer
        // await onRequestOtp(otp, phone);
        // generate the signature
        const signature = (0, utility_1.generateToken)({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });
        // send the result to the client
        return res.status(201).json({ result: result, signature: signature, verified: result.verified, email: result.email });
    }
    return res.status(404).json({ message: "Error with Signup" });
});
exports.customerSignup = customerSignup;
const customerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(dto_1.userLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, { validationError: { target: true } });
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    const { email, password } = loginInputs;
    const customer = yield customer_1.Customer.findOne({ email });
    if (customer) {
        const validation = yield (0, utility_1.validatePassword)(password, customer.password, customer.salt);
        if (validation) {
            // generate the signature
            const signature = (0, utility_1.generateToken)({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            });
            // send the result to the client
            return res.status(201).json({ signature: signature, verified: customer.verified, email: customer.email });
        }
    }
    return res.status(404).json({ message: "Error with Login" });
});
exports.customerLogin = customerLogin;
const customerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            console.log(profile.otp);
            console.log(profile.otpExpiry);
            console.log(new Date());
            if (profile.otp === parseInt(otp) && profile.otpExpiry >= new Date()) {
                console.log(profile);
                profile.verified = true;
                const updatedCustomerResponse = yield profile.save();
                // generate the signature
                const signature = (0, utility_1.generateToken)({
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
    return res.status(400).json({ message: "Error with OTP Validation" });
});
exports.customerVerify = customerVerify;
const requestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            const { otp, expiry } = (0, utility_1.generateOtp)();
            profile.otp = otp;
            profile.otpExpiry = expiry;
            yield profile.save();
            console.log(otp);
            // await onRequestOtp(otp, profile.phone);
            return res.status(200).json({ message: "OTP sent to your Registered Phone Number" });
        }
    }
    return res.status(400).json({ message: "Error with Request OTP" });
});
exports.requestOtp = requestOtp;
const getCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json({ profile: profile, message: "Profile showing successfully" });
        }
    }
    return res.status(400).json({ message: "Error with Fetching Profile" });
});
exports.getCustomerProfile = getCustomerProfile;
const editCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(dto_1.editCustomerProfileInputs, req.body);
    const profileErrors = yield (0, class_validator_1.validate)(profileInputs, { validationError: { target: true } });
    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInputs;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            return res.status(200).json({ result: result, message: "Editing Successful" });
        }
    }
    return res.status(400).json({ message: "Error with Editing Profile" });
});
exports.editCustomerProfile = editCustomerProfile;
//# sourceMappingURL=customerController.js.map
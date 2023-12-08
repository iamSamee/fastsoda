"use strict";
// Email 
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
exports.onRequestOtp = exports.generateOtp = void 0;
// notification
// OTP 
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.generateOtp = generateOtp;
const onRequestOtp = (otp, to) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = 'AC271d8d1817abd9dd50687652bd845859';
    const authToken = '93176e404206c72955e11fb190a7d888';
    const client = require('twilio')(accountSid, authToken);
    const response = yield client.messages.create({
        body: `Your otp is ${otp}`,
        to: `+92${to}`,
    });
});
exports.onRequestOtp = onRequestOtp;
// Payment Notification or emails
//# sourceMappingURL=notificationUtility.js.map
// Email 

// notification

// OTP 
export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random()*900000)
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30* 60 * 1000));
    return {otp, expiry}
}

export const onRequestOtp = async (otp: number, to: string) => {
    const accountSid = 'AC271d8d1817abd9dd50687652bd845859';
    const authToken = '93176e404206c72955e11fb190a7d888';

    const client = require('twilio')(accountSid, authToken);
    const response = await client.messages.create({
        body: `Your otp is ${otp}`,
        to: `+92${to}`,
    })
}

// Payment Notification or emails
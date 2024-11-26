export const host = 'http://localhost:5000';
// export const host = "https://wsb-server.onrender.com";
export const RegisterRoute = `${host}/api/auth/register`;
export const LoginRoute = `${host}/api/auth/login`;

export const OTPSendRoute = `${host}/api/otp/otpsend`;
export const OTPVerifyRoute = `${host}/api/otp/otpverify`;
export const ChangePasswordRoute = `${host}/api/auth/changepassword`;
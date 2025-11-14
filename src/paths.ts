const PATHS = {
  login: 'POST:/Authenticate',
  biometricAuth: 'POST:/TouchAuthenticate',
  generateOtp: 'POST:/GenerateOTP',
  validateOtp: 'POST:/ValidateOTP',
  register: 'POST:/CreateNewAccount',
  forgot: 'POST:/ForgotPassword'
};
export default PATHS;
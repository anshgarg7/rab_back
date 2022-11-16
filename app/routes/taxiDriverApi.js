var { resetPassword, getMyProfile, updateProfile, changePassword } = require('../src/controller/common/indexController');
var { login, otpVerify, updateMobileNo, forgotPassword } = require('../src/controller/taxiDriver/authController');
var { contactUsStore } = require('../src/controller/common/indexController')

var { Upload } = require('./common/files/upload');

var { LOGIN, OTP_VERIFY, UPDATE_MOBILE, FORGOT_PASS, RESET_PASS, UPDATE_PROFILE, CHANGE_PASS } = require('../src/service/Validation');

var { CONTACT_US } = require('../src/service/Validation');

var Auth = require('./middleware/auth');
var userAuth = require('./middleware/checkTaxiDriverAuthorized');

module.exports = (app) => {
	app.post('/api/v1/taxi_driver/login', LOGIN, login);
	app.post('/api/v1/taxi_driver/otp_verify', OTP_VERIFY, otpVerify);
	app.post('/api/v1/taxi_driver/update/mobile_no', UPDATE_MOBILE, updateMobileNo);
	app.post('/api/v1/taxi_driver/forgot_password', FORGOT_PASS, forgotPassword);
	app.post('/api/v1/taxi_driver/reset_password/:security_token', RESET_PASS, resetPassword);
	app.get('/api/v1/taxi_driver/get_profile', Auth, userAuth, getMyProfile);
	app.post('/api/v1/taxi_driver/contact_us/store', Auth, userAuth, CONTACT_US, contactUsStore);
	app.post('/api/v1/taxi_driver/update/profile', Auth, userAuth, Upload, UPDATE_PROFILE, updateProfile);
	app.post('/api/v1/taxi_driver/change_password', Auth, userAuth, CHANGE_PASS, changePassword);
}
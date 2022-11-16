var { resetPassword, getMyProfile, changePassword } = require('../src/controller/common/indexController');
var { login, otpVerify, updateMobileNo, forgotPassword } = require('../src/controller/hotel/authController');
var { dashboard, getReferrals } = require('../src/controller/hotel/hotelController');
var { contactUsStore } = require('../src/controller/common/indexController')

var { LOGIN, OTP_VERIFY, UPDATE_MOBILE, FORGOT_PASS, RESET_PASS, CHANGE_PASS } = require('../src/service/Validation');

var { CONTACT_US } = require('../src/service/Validation');

var Auth = require('./middleware/auth');
var userAuth = require('./middleware/checkHotelAuthorized');

module.exports = (app) => {
	app.post('/api/v1/hotel/login', LOGIN, login);
	app.post('/api/v1/hotel/otp_verify', OTP_VERIFY, otpVerify);
	app.post('/api/v1/hotel/update/mobile_no', UPDATE_MOBILE, updateMobileNo);
	app.post('/api/v1/hotel/forgot_password', FORGOT_PASS, forgotPassword);
	app.post('/api/v1/hotel/reset_password/:security_token', RESET_PASS, resetPassword);
	app.get('/api/v1/hotel/get_profile', Auth, userAuth, getMyProfile);
	app.post('/api/v1/hotel/contact_us/store', Auth, userAuth, CONTACT_US, contactUsStore);
	app.post('/api/v1/hotel/change_password', Auth, userAuth, CHANGE_PASS, changePassword);
	app.get('/api/v1/hotel/dashboard', Auth, userAuth, dashboard);
	app.get('/api/v1/hotel/get_referrals', Auth, userAuth, getReferrals);
}
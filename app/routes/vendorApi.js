var { login, register, otpVerify, updateMobileNo, kyc, bankDetail, forgotPassword } = require('../src/controller/vendor/authController');
var { resetPassword, getMyProfile, updateProfile, changePassword } = require('../src/controller/common/indexController');
var { getActivitiesByVendorSelectedCategory, getAdvantureActivityTypes, rentalActivities, rentalActivityStore, rentalActivityDetail, rentalActivityUpdate, activityUpdateStatus,  activityMediaFileDelete, adventureActivities, adventureActivityStore, adventureActivityDetail, adventureActivityUpdate, adventureActivityUpdateStatus, getAllBookings, getBookingDetails, completedBooking, getInventory, inventoryUpdateStatus, dashboard, ledger } = require('../src/controller/vendor/activitiesController');
var { contactUsStore } = require('../src/controller/common/indexController')
var { Upload } = require('./common/files/upload');
var { Activity_upload } = require('./common/files/activity');

var { LOGIN, USER_SIGNUP, VENDOR_BUSINESS_DETAIL, OTP_VERIFY, UPDATE_MOBILE, KYC, BANK_DETAIL, FORGOT_PASS, RESET_PASS, CONTACT_US, UPDATE_PROFILE, CHANGE_PASS, UPDATE_STATUS, RENTAL_ACTIVITY, ADVENTURE_ACTIVITY, VENDOR_ACTIVITY, SLOT_UPDATE_STATUS } = require('../src/service/Validation');

var Auth = require('./middleware/auth');
var vendorAuth = require('./middleware/checkVendorAuthorized');
const { getBookingDetail } = require('../src/controller/user/homeController');

module.exports = (app) => {
	app.post('/api/v1/vendor/login', LOGIN, login);
	app.post('/api/v1/vendor/signup', Upload, VENDOR_BUSINESS_DETAIL, USER_SIGNUP, register);
	app.post('/api/v1/vendor/otp_verify', OTP_VERIFY, otpVerify);
	app.post('/api/v1/vendor/update/mobile_no', UPDATE_MOBILE, updateMobileNo);
	app.post('/api/v1/vendor/kyc', Auth, vendorAuth, Upload, KYC, kyc);
	app.post('/api/v1/vendor/bank_details', Auth, vendorAuth, BANK_DETAIL, bankDetail);
	
	app.post('/api/v1/vendor/forgot_password', FORGOT_PASS, forgotPassword);
	app.post('/api/v1/vendor/reset_password/:security_token', RESET_PASS, resetPassword);
	app.get('/api/v1/vendor/get_profile', Auth, vendorAuth, getMyProfile);
	app.post('/api/v1/vendor/update/profile', Auth, vendorAuth, Upload, UPDATE_PROFILE, updateProfile);
	app.post('/api/v1/vendor/change_password', Auth, vendorAuth, CHANGE_PASS, changePassword);

	app.get('/api/v1/vendor/get_activities_by_vendor_selected_category', Auth, vendorAuth, getActivitiesByVendorSelectedCategory);
	app.get('/api/v1/vendor/get_adventure_activity_types/:activity_id', Auth, vendorAuth, getAdvantureActivityTypes);

	app.get('/api/v1/vendor/rental_activities', Auth, vendorAuth, rentalActivities);
	app.post('/api/v1/vendor/rental_activity/store', Auth, vendorAuth, Activity_upload, RENTAL_ACTIVITY, VENDOR_ACTIVITY, rentalActivityStore);
	app.get('/api/v1/vendor/rental_activities/detail/:id', Auth, vendorAuth, rentalActivityDetail);
	app.post('/api/v1/vendor/rental_activity/update/:id', Auth, vendorAuth, Activity_upload, RENTAL_ACTIVITY, VENDOR_ACTIVITY, rentalActivityUpdate);
	app.post('/api/v1/vendor/rental_activity/update_status/:id', Auth, vendorAuth, UPDATE_STATUS, activityUpdateStatus);
	app.get('/api/v1/vendor/rental_activity/media_file/delete/:id', Auth, vendorAuth, activityMediaFileDelete);

	app.get('/api/v1/vendor/adventure_activities', Auth, vendorAuth, adventureActivities);
	app.post('/api/v1/vendor/adventure_activity/store', Auth, vendorAuth, Activity_upload, ADVENTURE_ACTIVITY, VENDOR_ACTIVITY, adventureActivityStore);
	app.get('/api/v1/vendor/adventure_activity/detail/:id', Auth, vendorAuth, adventureActivityDetail);
	app.post('/api/v1/vendor/adventure_activity/update/:id', Auth, vendorAuth, Activity_upload, ADVENTURE_ACTIVITY, VENDOR_ACTIVITY, adventureActivityUpdate);
	app.post('/api/v1/vendor/adventure_activity/update_status/:id', Auth, vendorAuth, UPDATE_STATUS, adventureActivityUpdateStatus);
	app.get('/api/v1/vendor/adventure_activity/media_file/delete/:id', Auth, vendorAuth, activityMediaFileDelete);

	app.get('/api/v1/vendor/get_all_bookings', Auth, vendorAuth, getAllBookings);
	app.get('/api/v1/vendor/get_booking_details/:activity_category/:id', Auth, vendorAuth, getBookingDetails);
	app.get('/api/v1/vendor/completed_booking/:activity_category/:id', Auth, vendorAuth, completedBooking);

	app.get('/api/v1/vendor/get_inventory', Auth, vendorAuth, getInventory);
	app.post('/api/v1/vendor/inventory/update_status/:id', Auth, vendorAuth, SLOT_UPDATE_STATUS, inventoryUpdateStatus);

	app.get('/api/v1/vendor/dashboard', Auth, vendorAuth, dashboard);

	app.get('/api/v1/vendor/ledger', Auth, vendorAuth, ledger);

	//contact-us
	app.post('/api/v1/vendor/contact_us/store', Auth, vendorAuth, CONTACT_US, contactUsStore);
}
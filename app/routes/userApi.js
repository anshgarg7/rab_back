var { resetPassword, getMyProfile, updateProfile, changePassword } = require('../src/controller/common/indexController');
var { login, register, otpVerify, updateMobileNo, forgotPassword, getAllActivities, getAllUserInterestedActivities, userInterstedActivitiesStore } = require('../src/controller/user/authController');
var { cronScheduleBooking, getActivitiesPlaces, getAllActivitiesOfState, getAllRentalAdventureActivities, getAllRentalAdventureActivitiesOfState, getActivitiesOfSelectedActivity, getActivitiesOfSelectedActivityByState, getAllAdventureActivities, getAllRentalActivities, getPopularActivities, getPopularActivitiesByState, getPopularActivitiesByCategory, getPopularActivitiesByActivity, getActivityDetail, getFilterActivities, getAllLocation, applyReferral, booking, bookingPayment, getAllBookings, getBookingDetail, bookingCancel, getFilterTaxi, getTaxiDetail, taxiBooking, taxiBookingPayment, taxiBookingCancel, getAllTaxiBookings, getTaxiBookingDetail, bookingRatingReviews, taxiBookingRatingReviews, checkBookingRatingReviews, checkTaxiBookingRatingReviews, skipBookingRatingReviews, skipTaxiBookingRatingReviews } = require('../src/controller/user/homeController');
var { contactUsStore } = require('../src/controller/common/indexController')

var { Upload } = require('./common/files/upload');

var { LOGIN, USER_SIGNUP, OTP_VERIFY, UPDATE_MOBILE, FORGOT_PASS, RESET_PASS, UPDATE_PROFILE, CHANGE_PASS, USER_INTERSTED_ACTIVITIES } = require('../src/service/Validation');

var { CONTACT_US, APPLY_REFERRAL, BOOKING, BOOKING_PAYMENT, TAXI_FILTER, TAXI_DETAIL, TAXI_BOOKING, TAXI_BOOKING_PAYMENT, BOOKING_RATING_REVIEWS, TAXI_BOOKING_RATING_REVIEWS, SKIP_BOOKING_RATING_REVIEWS, SKIP_TAXI_BOOKING_RATING_REVIEWS } = require('../src/service/Validation');

var Auth = require('./middleware/auth');
var userAuth = require('./middleware/checkUserAuthorized');
const cron = require("node-cron");

module.exports = (app) => {
	/* cron job which runs on every 5 minutes */
	cron.schedule("*/5 * * * *", cronScheduleBooking);
	app.post('/api/v1/user/login', LOGIN, login);
	app.post('/api/v1/user/signup', Upload, USER_SIGNUP, register);
	app.post('/api/v1/user/otp_verify', OTP_VERIFY, otpVerify);
	app.post('/api/v1/user/update/mobile_no', UPDATE_MOBILE, updateMobileNo);
	app.post('/api/v1/user/forgot_password', FORGOT_PASS, forgotPassword);
	app.post('/api/v1/user/reset_password/:security_token', RESET_PASS, resetPassword);
	app.get('/api/v1/user/get_all_activities', getAllActivities);
	app.get('/api/v1/user/get_activities_of_selected_activity/:activity_category/:activity_id', getActivitiesOfSelectedActivity);
	app.get('/api/v1/user/get_all_adventure_activities', getAllAdventureActivities);
	app.get('/api/v1/user/get_all_rental_activities', getAllRentalActivities);
	app.get('/api/v1/user/get_all_user_interested_activities', Auth, userAuth, getAllUserInterestedActivities);
	app.post('/api/v1/user/user_interested_activities/store', USER_INTERSTED_ACTIVITIES, userInterstedActivitiesStore);
	app.get('/api/v1/user/get_profile', Auth, userAuth, getMyProfile);
	app.post('/api/v1/user/contact_us/store', Auth, userAuth, CONTACT_US, contactUsStore);
	app.post('/api/v1/user/update/profile', Auth, userAuth, Upload, UPDATE_PROFILE, updateProfile);
	app.post('/api/v1/user/change_password', Auth, userAuth, CHANGE_PASS, changePassword);
	app.get('/api/v1/user/get_activities_places', getActivitiesPlaces);
	app.get('/api/v1/user/get_all_activities/:state', getAllActivitiesOfState);
	app.get('/api/v1/user/get_all_rental_adventure_activities', getAllRentalAdventureActivities);
	app.get('/api/v1/user/get_all_rental_adventure_activities/:state', getAllRentalAdventureActivitiesOfState);
	app.get('/api/v1/user/get_activities_of_selected_activity/:state/:activity_category/:activity_id', getActivitiesOfSelectedActivityByState);
	app.get('/api/v1/user/get_popular_activities', getPopularActivities);
	app.get('/api/v1/user/get_popular_activities/:state', getPopularActivitiesByState);
	app.get('/api/v1/user/get_category_popular_activities/:activity_category', getPopularActivitiesByCategory);
	app.get('/api/v1/user/get_activity_popular_activities/:activity_id', getPopularActivitiesByActivity);
	app.get('/api/v1/user/get_activity_detail/:activity_category/:id', getActivityDetail);
	app.post('/api/v1/user/get_filter_activities', getFilterActivities);
	app.get('/api/v1/user/get_all_location/:state', getAllLocation);
	app.post('/api/v1/user/apply_referral', Auth, userAuth, APPLY_REFERRAL, applyReferral);
	app.post('/api/v1/user/booking', Auth, userAuth, BOOKING, booking);
	app.post('/api/v1/user/booking_payment', Auth, userAuth, BOOKING_PAYMENT, bookingPayment);
	app.get('/api/v1/user/get_all_bookings', Auth, userAuth, getAllBookings);
	app.get('/api/v1/user/get_booking_detail/:activity_category/:id', Auth, userAuth, getBookingDetail);
	app.get('/api/v1/user/booking_cancel/:activity_category/:id', Auth, userAuth, bookingCancel);
	app.post('/api/v1/user/get_filter_taxi', TAXI_FILTER, getFilterTaxi);
	app.post('/api/v1/user/get_taxi_detail/:id', TAXI_DETAIL, getTaxiDetail);
	app.post('/api/v1/user/taxi_booking', Auth, userAuth, TAXI_BOOKING, taxiBooking);
	app.post('/api/v1/user/taxi_booking_payment', Auth, userAuth, TAXI_BOOKING_PAYMENT, taxiBookingPayment);
	app.get('/api/v1/user/taxi_booking_cancel/:id', Auth, userAuth, taxiBookingCancel);
	app.get('/api/v1/user/get_all_taxi_bookings', Auth, userAuth, getAllTaxiBookings);
	app.get('/api/v1/user/get_taxi_booking_detail/:id', Auth, userAuth, getTaxiBookingDetail);
	app.post('/api/v1/user/booking_rating_reviews', Auth, userAuth, BOOKING_RATING_REVIEWS, bookingRatingReviews);
	app.post('/api/v1/user/taxi_booking_rating_reviews', Auth, userAuth, TAXI_BOOKING_RATING_REVIEWS, taxiBookingRatingReviews);
	app.get('/api/v1/user/check_booking_rating_reviews', Auth, userAuth, checkBookingRatingReviews);
	app.get('/api/v1/user/check_taxi_booking_rating_reviews', Auth, userAuth, checkTaxiBookingRatingReviews);
	app.post('/api/v1/user/skip_booking_rating_reviews', Auth, userAuth, SKIP_BOOKING_RATING_REVIEWS, skipBookingRatingReviews);
	app.post('/api/v1/user/skip_taxi_booking_rating_reviews', Auth, userAuth, SKIP_TAXI_BOOKING_RATING_REVIEWS, skipTaxiBookingRatingReviews);
}
var { reset, submit_reset, thankyou } = require('../src/controller/web');
var { loginForm, login, logout } = require('../src/controller/admin/authController');
var { dashboard, profile, getModelList, permissionsIndex, permissionsStore } = require('../src/controller/admin/dashboardController');
var { subAdminIndex, subAdminCreate, subAdminStore, subAdminPermissions, subAdminPermissionsUpdate, subAdminView, subAdminEdit, subAdminUpdate, subAdminUpdateStatus, subAdminDelete, vendorsIndex, vendorsCreate, vendorsStore, vendorsView, vendorsEdit, vendorsUpdate, vendorsIsApproved, vendorsUpdateStatus, vendorsDelete, usersIndex, usersCreate, usersStore, usersView, usersEdit, usersUpdate, usersUpdateStatus, usersDelete, taxiDriversIndex, taxiDriversCreate, taxiDriversStore, taxiDriversView, taxiDriversEdit, taxiDriversUpdate, taxiDriversIsApproved, taxiDriversUpdateStatus, taxiDriversDelete, hotelsIndex, hotelsCreate, hotelsStore, hotelsView, hotelsEdit, hotelsUpdate, hotelsUpdateStatus, hotelsDelete, createVendorAllActivitiesDiscount, storeVendorAllActivitiesDiscount } = require('../src/controller/admin/userController');
var { categoriesIndex, categoriesView, categoriesUpdateStatus, activitiesAdventureIndex, activitiesAdventureCreate, activitiesAdventureStore, activitiesAdventureView, activitiesAdventureCreateActivityType, activitiesAdventureStoteActivityType, activitiesAdventureEditActivityType, activitiesAdventureUpdateActivityType, activitiesAdventureUpdateActivityTypeStatus, activitiesAdventureEdit, activitiesAdventureUpdate, activitiesAdventureUpdateStatus, activitiesRentalIndex, activitiesRentalCreate, activitiesRentalStore, activitiesRentalView, activitiesRentalUpdateBrandStatus, activitiesRentalBrandView, activitiesRentalUpdateModelStatus, activitiesRentalEdit, activitiesRentalUpdate, activitiesRentalUpdateStatus } = require('../src/controller/admin/categoriesController');
var { vendorAdventureActivitiesIndex, vendorAdventureActivitiesView, vendorAdventureActivitiesIsApproved, vendorAdventureActivitiesUpdateStatus, vendorRentalActivitiesIndex, vendorRentalActivitiesView, vendorRentalActivitiesIsApproved, vendorRentalActivitiesUpdateStatus, bookingsIndex, viewBookingsDetail, allTransactions, taxiBookingsIndex, taxiBookingsDetail, getAdventureActivityPriceList, addNewAdventureActivityAmount, createAdventureActivityDiscount, storeAdventureActivityDiscount, getRentalActivityPriceList, addNewRentalActivityAmount, createRentalActivityDiscount, storeRentalActivityDiscount  } = require('../src/controller/admin/vendorActivitiesController');
var { contactUs, contactUsView, contactUsReplyMessageStore, contactUsDelete, privacyPolicy, privacyPolicyStore, termConditions, termConditionsStore } = require('../src/controller/admin/pagesController');
var { taxiRateListIndex, taxiRateListEdit, taxiRateListUpdate } = require('../src/controller/admin/taxiController');

var adminAuth = require('./middleware/adminAuth');
var permission = require('./middleware/permission');

var { Upload } = require('./common/files/upload');
var { Activity_upload } = require('./common/files/activity');

module.exports = (app) => {
	app.get(['/reset/:token','/reset'], reset);
    app.post('/reset/:token', submit_reset);
	app.get('/thankyou',thankyou);

	// Login
	app.get('/', loginForm);
	app.get('/admin/login', loginForm);
	app.post('/admin/login', login);

	/* Dashboard */
	app.get('/admin/dashboard', adminAuth, dashboard);
	/* Profile */
	app.get('/admin/profile', adminAuth, profile);
	/* Get Model List*/ 
	app.get('/admin/get_model_list/:id', adminAuth, getModelList);
	
	/* Super Admin / Admin */
	app.get('/admin/users/sub_admin/index', adminAuth, permission('sub_admin__view'), subAdminIndex);
	app.get('/admin/users/sub_admin/create', adminAuth, permission('sub_admin__add'), subAdminCreate);
	app.post('/admin/users/sub_admin/store', adminAuth, Upload, subAdminStore);
	app.get('/admin/users/sub_admin/permissions/:id', adminAuth, permission('permissions__view'), subAdminPermissions);
	app.post('/admin/users/sub_admin/permissions/update/:id', adminAuth, subAdminPermissionsUpdate);
	app.get('/admin/users/sub_admin/view/:id', adminAuth, permission('sub_admin__view'), subAdminView);
	app.get('/admin/users/sub_admin/edit/:id', adminAuth, permission('sub_admin__edit'), subAdminEdit);
	app.post('/admin/users/sub_admin/update/:id', adminAuth, Upload, subAdminUpdate);
	app.post('/admin/users/sub_admin/update_status/:id', adminAuth, permission('sub_admin__edit'), subAdminUpdateStatus);
	app.post('/admin/users/sub_admin/delete/:id', adminAuth, permission('sub_admin__delete'), subAdminDelete);

	/* Vendors */
	app.get('/admin/users/vendors/index', adminAuth, permission('vendor__view'), vendorsIndex);
	app.get('/admin/users/vendors/create', adminAuth, permission('vendor__add'), vendorsCreate);
	app.post('/admin/users/vendors/store', adminAuth, Upload, vendorsStore);
	app.get('/admin/users/vendors/view/:id', adminAuth, permission('vendor__view'), vendorsView);
	app.get('/admin/users/vendors/edit/:id', adminAuth, permission('vendor__edit'), vendorsEdit);
	app.post('/admin/users/vendors/update/:id', adminAuth, Upload, vendorsUpdate);
	app.post('/admin/users/vendors/is_approved/:id', adminAuth, permission('vendor__edit'), vendorsIsApproved);
	app.post('/admin/users/vendors/update_status/:id', adminAuth, permission('vendor__edit'), vendorsUpdateStatus);
	app.post('/admin/users/vendors/delete/:id', adminAuth, permission('vendor__delete'), vendorsDelete);

	app.get('/admin/create_vendor_all_activities_discount/:id', adminAuth, permission('vendor__edit'), createVendorAllActivitiesDiscount);
	app.post('/admin/store_vendor_all_activities_discount', adminAuth, permission('vendor__edit'), storeVendorAllActivitiesDiscount);

	/* Users */
	app.get('/admin/users/users/index', adminAuth, permission('user__view'), usersIndex);
	app.get('/admin/users/users/create', adminAuth, permission('user__add'), usersCreate);
	app.post('/admin/users/users/store', adminAuth, Upload, usersStore);
	app.get('/admin/users/users/view/:id', adminAuth, permission('user__view'), usersView);
	app.get('/admin/users/users/edit/:id', adminAuth, permission('user__edit'), usersEdit);
	app.post('/admin/users/users/update/:id', adminAuth, Upload, usersUpdate);
	app.post('/admin/users/users/update_status/:id', adminAuth, permission('user__edit'), usersUpdateStatus);
	app.post('/admin/users/users/delete/:id', adminAuth, permission('user__delete'), usersDelete);

	/* Taxi Drivers */
	app.get('/admin/users/taxi_drivers/index', adminAuth, permission('driver__view'), taxiDriversIndex);
	app.get('/admin/users/taxi_drivers/create', adminAuth, permission('driver__add'), taxiDriversCreate);
	app.post('/admin/users/taxi_drivers/store', adminAuth, Upload, taxiDriversStore);
	app.get('/admin/users/taxi_drivers/view/:id', adminAuth, permission('driver__view'), taxiDriversView);
	app.get('/admin/users/taxi_drivers/edit/:id', adminAuth, permission('driver__edit'), taxiDriversEdit);
	app.post('/admin/users/taxi_drivers/update/:id', adminAuth, Upload, taxiDriversUpdate);
	app.post('/admin/users/taxi_drivers/is_approved/:id', adminAuth, permission('driver__edit'), taxiDriversIsApproved);
	app.post('/admin/users/taxi_drivers/update_status/:id', adminAuth, permission('driver__edit'), taxiDriversUpdateStatus);
	app.post('/admin/users/taxi_drivers/delete/:id', adminAuth, permission('driver__delete'), taxiDriversDelete);

	/* Hotels */
	app.get('/admin/users/hotels/index', adminAuth, permission('hotel__view'), hotelsIndex);
	app.get('/admin/users/hotels/create', adminAuth, permission('hotel__add'), hotelsCreate);
	app.post('/admin/users/hotels/store', adminAuth, Upload, hotelsStore);
	app.get('/admin/users/hotels/view/:id', adminAuth, permission('hotel__view'), hotelsView);
	app.get('/admin/users/hotels/edit/:id', adminAuth, permission('hotel__edit'), hotelsEdit);
	app.post('/admin/users/hotels/update/:id', adminAuth, Upload, hotelsUpdate);
	app.post('/admin/users/hotels/update_status/:id', adminAuth, permission('hotel__edit'), hotelsUpdateStatus);
	app.post('/admin/users/hotels/delete/:id', adminAuth, permission('hotel__delete'), hotelsDelete);

	/* Categories */
	app.get('/admin/categories/index', adminAuth, permission('categories__view'), categoriesIndex);
	app.get('/admin/categories/view', adminAuth, categoriesView);
	app.post('/admin/categories/update_status/:id', adminAuth, adminAuth, permission('categories__edit'), categoriesUpdateStatus);

	/* Activities (Adventure) */
	app.get('/admin/activities_adventure/index', adminAuth, permission('adventure_activities__view'), activitiesAdventureIndex);
	app.get('/admin/activities_adventure/create', adminAuth, permission('adventure_activities__add'), activitiesAdventureCreate);
	app.post('/admin/activities_adventure/store', adminAuth, Activity_upload, activitiesAdventureStore);
	app.get('/admin/activities_adventure/view/:id', adminAuth, permission('adventure_activities__view'), activitiesAdventureView);
	app.get('/admin/activities_adventure/:id/create_activity_type', adminAuth, activitiesAdventureCreateActivityType);
	app.post('/admin/activities_adventure/store_activity_type', adminAuth, activitiesAdventureStoteActivityType);
	app.get('/admin/activities_adventure/edit_activity_type/:id', adminAuth, activitiesAdventureEditActivityType);
	app.post('/admin/activities_adventure/update_activity_type/:id', adminAuth, activitiesAdventureUpdateActivityType);
	app.post('/admin/activities_adventure/update_activity_type_status/:id', adminAuth, activitiesAdventureUpdateActivityTypeStatus);
	app.get('/admin/activities_adventure/edit/:id', adminAuth, permission('adventure_activities__edit'), activitiesAdventureEdit);
	app.post('/admin/activities_adventure/update/:id', adminAuth, Activity_upload, activitiesAdventureUpdate);
	app.post('/admin/activities_adventure/update_status/:id', adminAuth, permission('adventure_activities__edit'), activitiesAdventureUpdateStatus);

	app.get('/admin/get_adventure_activity_price_list/:activity_id', adminAuth, permission('adventure_activities__edit'), getAdventureActivityPriceList);
	app.post('/admin/add_new_adventure_activity_amount', adminAuth, permission('adventure_activities__edit'), addNewAdventureActivityAmount);
	app.get('/admin/create_adventure_activity_discount/:id', adminAuth, permission('adventure_activities__edit'), createAdventureActivityDiscount);
	app.post('/admin/store_adventure_activity_discount', adminAuth, permission('adventure_activities__edit'), storeAdventureActivityDiscount);

	/* Activities (Rental) */
	app.get('/admin/activities_rental/index', adminAuth, permission('rental_activities__view'), activitiesRentalIndex);
	app.get('/admin/activities_rental/create', adminAuth, permission('rental_activities__add'), activitiesRentalCreate);
	app.post('/admin/activities_rental/store', adminAuth, Activity_upload, activitiesRentalStore);
	app.get('/admin/activities_rental/view/:id', adminAuth, permission('rental_activities__view'), activitiesRentalView);
	app.post('/admin/activities_rental/update_brand_status/:id', adminAuth, activitiesRentalUpdateBrandStatus);
	app.get('/admin/activities_rental/:activity_id/brand/view/:brand_id', adminAuth, activitiesRentalBrandView);
	app.post('/admin/activities_rental/update_model_status/:id', adminAuth, activitiesRentalUpdateModelStatus);
	app.get('/admin/activities_rental/edit/:id', adminAuth, permission('rental_activities__edit'), activitiesRentalEdit);
	app.post('/admin/activities_rental/update/:id', adminAuth, Activity_upload, activitiesRentalUpdate);
	app.post('/admin/activities_rental/update_status/:id', adminAuth, permission('rental_activities__edit'), activitiesRentalUpdateStatus);

	app.get('/admin/get_rental_activity_price_list/:activity_id', adminAuth, permission('rental_activities__edit'), getRentalActivityPriceList);
	app.post('/admin/add_new_rental_activity_amount', adminAuth, permission('rental_activities__edit'), addNewRentalActivityAmount);
	app.get('/admin/create_rental_activity_discount/:id', adminAuth, permission('rental_activities__edit'), createRentalActivityDiscount);
	app.post('/admin/store_rental_activity_discount', adminAuth, permission('rental_activities__edit'), storeRentalActivityDiscount);

	/* Vendor Activities (Adventure) */
	app.get('/admin/vendor_adventure_activities/index', adminAuth, permission('vendor_adventure_activities__view'), vendorAdventureActivitiesIndex);
	app.get('/admin/vendor_adventure_activities/view/:id', adminAuth, permission('vendor_adventure_activities__view'), vendorAdventureActivitiesView);
	app.post('/admin/vendor_adventure_activities/is_approved/:id', adminAuth, permission('vendor_adventure_activities__edit'), vendorAdventureActivitiesIsApproved);
	app.post('/admin/vendor_adventure_activities/update_status/:id', adminAuth, permission('vendor_adventure_activities__edit'), vendorAdventureActivitiesUpdateStatus);

	/* Vendor Activities (Rental) */
	app.get('/admin/vendor_rental_activities/index', adminAuth, permission('vendor_rental_activities__view'), vendorRentalActivitiesIndex);
	app.get('/admin/vendor_rental_activities/view/:id', adminAuth, permission('vendor_rental_activities__view'), vendorRentalActivitiesView);
	app.post('/admin/vendor_rental_activities/is_approved/:id', adminAuth, permission('vendor_rental_activities__edit'), vendorRentalActivitiesIsApproved);
	app.post('/admin/vendor_rental_activities/update_status/:id', adminAuth, permission('vendor_rental_activities__edit'), vendorRentalActivitiesUpdateStatus);

	/* Bookings */
	app.get('/admin/bookings/index', adminAuth, permission('activities_bookings__view'), bookingsIndex);
	app.get('/admin/bookings/view_booking_detail/:id', adminAuth, permission('activities_bookings__view'), viewBookingsDetail);

	app.get('/admin/taxi_bookings/index', adminAuth, permission('taxi_bookings__view'), taxiBookingsIndex);
	app.get('/admin/taxi_bookings/view_taxi_booking_detail/:id', adminAuth, permission('taxi_bookings__view'), taxiBookingsDetail);

	/* All Transactions */
	app.get('/admin/all_transactions', adminAuth, permission('all_transactions__view'), allTransactions);

	/* Pages */
	app.get('/admin/contact_us', adminAuth, permission('contact_us__view'), contactUs);
	app.get('/admin/contact_us/view/:id', adminAuth, permission('contact_us__view'), contactUsView);
	app.post('/admin/contact_us/reply_meaasge/:id', adminAuth, permission('contact_us__reply'), contactUsReplyMessageStore);
	app.post('/admin/contact_us/delete/:id', adminAuth, permission('contact_us__delete'), contactUsDelete);
	app.get('/admin/privacy_policy', adminAuth, permission('privacy_policy__view'), privacyPolicy);
	app.post('/admin/privacy_policy/store', adminAuth, privacyPolicyStore);
	app.get('/admin/term_conditions', adminAuth, permission('term_conditions__view'), termConditions);
	app.post('/admin/term_conditions/store', adminAuth, termConditionsStore);

	/* Taxi Rate List */
	app.get('/admin/taxi_rate_list/index', adminAuth, permission('taxi_rate_list__view'), taxiRateListIndex);
	app.get('/admin/taxi_rate_list/edit/:id', adminAuth, permission('taxi_rate_list__edit'), taxiRateListEdit);
	app.post('/admin/taxi_rate_list/update/:id', adminAuth, taxiRateListUpdate);

	/* Permissions */
	app.get('/admin/permissions/index', adminAuth, permission('permissions__view'), permissionsIndex);
	app.post('/admin/permissions/store', adminAuth, permission('permissions__edit'), permissionsStore);

	app.post('/admin/logout', adminAuth, logout);

}

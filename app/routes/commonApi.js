var { categories, brands, models, privacyPolicy, termConditions, contactUsStore } = require('../src/controller/common/indexController')

var { CONTACT_US } = require('../src/service/Validation');

module.exports = (app) => {
	app.get('/api/v1/categories', categories);
	app.get('/api/v1/brands/:activity_id', brands);
	app.get('/api/v1/models/:brand_id', models);
	app.get('/api/v1/privacy_policy', privacyPolicy);
	app.get('/api/v1/term_conditions', termConditions);
	app.post('/api/v1/contact_us/store', CONTACT_US, contactUsStore);
}
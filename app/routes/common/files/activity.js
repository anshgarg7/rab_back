var multer = require('multer');
let files = {};
var storageK = multer.diskStorage({
	destination: function (req, file, callback) {
		if(file.fieldname == 'image')
		callback(null, 'public/uploadImages/activity');

		if(file.fieldname == 'images')
		callback(null, 'public/uploadImages/activityMedia');

		if(file.fieldname == 'video')
		callback(null, 'public/uploadImages/activityMedia');
	},
	
	filename: function (req, file, callback) {
		let fileName = file.originalname.split('.');
		let fileExtension = fileName[fileName.length-1];
		let randomNoGenerate = Math.floor(1000 + Math.random() * 9000);
		callback(null, randomNoGenerate +''+ Date.now() + '.' + fileExtension);
	}
});

var kUpload = multer({ storage: storageK })

files.Activity_upload = kUpload.fields([
	{
		name: 'image',
		maxCount:1
	},
	{
		name: 'images',
		maxCount:5
	},
	{
		name: 'video',
		maxCount:1
	}
]);

module.exports = files;
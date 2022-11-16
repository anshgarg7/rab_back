$.validator.addMethod(
    "validEmail", function (value, element) {
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        return pattern.test(value);
    },'Please enter a valid email address.'
);

// $.validator.addMethod(
//     "validAddress", function (value, element) {
//         var pattern = /^[^\s][A-Za-z0-9\s]*$/;
//         return pattern.test(value);
//     },'Please enter a valid address.'
// );

// $.validator.addMethod(
//     "validLandmark", function (value, element) {
//         var pattern = /^[^\s][A-Za-z0-9\s]*$/;
//         return pattern.test(value);
//     },'Please enter a valid landmark.'
// );

$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, 'File size less than 100kb');

var manageUserRules = {
    first_name : {
        required : true,
        minlength: 3,
        maxlength: 10,
        lettersonly: true,
    },
    last_name : {
        minlength: 3,
        maxlength: 10,
        lettersonly: true,
    },
    email : {
        required : true,
        validEmail: true,
        maxlength: 40,
    },
    password : {
        required : true,
        minlength: 8,
        maxlength: 16,
    },
    confirm_password : {
        required : true,
        minlength: 8,
        maxlength: 16,
        equalTo:"#password"
    },
    mobile_no : {
        required : true,
    },
    gender : {
        required : true,
    },
    dob : {
        required : true,
    },
    country : {
        required : true,
    },
    state : {
        required : true,
    },
    city : {
        required : true,
    },
    address : {
        required : true,
        // validAddress: true,
    },
    pin_code : {
        required : true,
        digits: true,
        minlength: 6,
        maxlength: 6,
    },
    landmark : {
        required : true,
        // validLandmark: true,
    },
    image : {
        required : {
            depends: function(element) {
                return !$("#imageData").attr('src');
            },
        },
        filesize: 100000,
    }
};

var manageUserMessage = { 
    first_name : {
        required : "Please enter your first name.",
        lettersonly : "Please enter your valid first name.",
        maxlength: "First name may not be greater than 10 characters.",
    },
    last_name : {
        lettersonly : "Please enter your valid last name.",
        maxlength: "Last name may not be greater than 10 characters.",
    },
    email : {
        required : "Please enter your email.",
        maxlength: "Email may not be greater than 40 characters.",
    },
    password : {
        required : "Please enter your password.",
        minlength: "Password must be at least 8 characters.",
        maxlength: "Password may not be greater than 16 characters.",
    },
    confirm_password : {
        required : "Please enter your confirm password.",
        minlength: "Confirm password must be at least 8 characters.",
        maxlength: "Confirm password may not be greater than 16 characters.",
        equalTo: "Password and confirm password does not match.",
    },
    mobile_no : {
        required : "Please enter your mobile.",
    },
    gender : {
        required : "Please select your gender.",
    },
    dob : {
        required : "Please select your date of birth.",
    },
    country : {
        required : "Please select your country.",
    },
    state : {
        required : "Please select your state.",
    },
    city : {
        required : "Please select your city.",
    },
    address : {
        required : "Please enter your address.",
    },
    pin_code : {
        required : "Please enter your pin code.",
    },
    landmark : {
        required : "Please enter your landmark.",
    },
    image : {
        required : "Please upload your image.",
    },
};

$('#subAdminForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#vendorForm').validate({
    rules : Object.assign(manageUserRules, {
                business_name : {
                    required : true,
                    minlength: 3,
                    maxlength: 50,
                },
                aletrnate_mobile_no : {
                    required : true,
                    maxlength: 20,
                },
                category_id : {
                    required : true,
                },
                location : {
                    required : true,
                    maxlength: 191,
                },
                gst_no : {
                    required : true,
                    maxlength: 50,
                },
                description : {
                    required : true,
                },
                visiting_card_image : {
                    filesize : 100000,
                },
                award_certification_image : {
                    filesize : 100000,
                },
            }),
    messages :Object.assign(manageUserMessage, {
                business_name : {
                    required : "Please enter your business name.",
                    maxlength: "Business name may not be greater than 50 characters.",
                },
                aletrnate_mobile_no : {
                    required : "Please enter your business aletrnate mobile.",
                    maxlength: "Aletrnate mobile may not be greater than 20 characters.",
                },
                category_id : {
                    required : "Please select your business category.",
                },
                location : {
                    required : "Please enter your business location.",
                    maxlength: "Location may not be greater than 191 characters.",
                },
                gst_no : {
                    required : "Please enter your business GST number.",
                    maxlength: "GST number may not be greater than 50 characters.",
                },
                description : {
                    required : "Please enter your business description.",
                },
            }),
});

$('#userForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#taxiDriverForm').validate({
    rules : Object.assign(manageUserRules, {
        brand_id : {
            required : true,
        },
        model_id : {
            required : true,
        },
        registration_no : {
            required : true,
        },
        location : {
            required : true,
        },
        driving_area_radius : {
            required : true,
        },
        license_no : {
            required : true,
        },
        license_expiry_date : {
            required : true,
        },
        license_fornt_image : {
            required : {
                depends: function(element) {
                    return !$("#licenseForntImage").attr('src');
                }
            },
            filesize : 100000,
        },
        license_back_image : {
            required : {
                depends: function(element) {
                    return !$("#licenseBackImage").attr('src');
                }
            },
            filesize : 100000,
        },
    }),
    messages :Object.assign(manageUserMessage, {
        brand_id : {
            required : "Please select a brand.",
        },
        model_id : {
            required : "Please select a model.",
        },
        registration_no : {
            required : "Please enter your registration number.",
        },
        location : {
            required : "Please enter your loaction.",
        },
        driving_area_radius : {
            required : "Please enter area radus.",
        },
        license_no : {
            required : "Please enter your license number.",
        },
        license_expiry_date : {
            required : "Please selete your license expiry date.",
        },
        license_fornt_image : {
            required : "Please upload image.",
        },
        license_back_image : {
            required : "Please upload image.",
        },
    }),
});

// $('#hotelForm').validate({
//     rules : manageUserRules,
//     messages :manageUserMessage,
// });

$('#hotelForm').validate({
    rules : Object.assign(manageUserRules, {
                business_name : {
                    required : true,
                    minlength: 3,
                    maxlength: 50,
                },
                aletrnate_mobile_no : {
                    required : true,
                    maxlength: 20,
                },
                location : {
                    required : true,
                    maxlength: 191,
                },
                gst_no : {
                    required : true,
                    maxlength: 50,
                },
                description : {
                    required : true,
                },
            }),
    messages :Object.assign(manageUserMessage, {
                business_name : {
                    required : "Please enter your business name.",
                    maxlength: "Business name may not be greater than 50 characters.",
                },
                aletrnate_mobile_no : {
                    required : "Please enter your business aletrnate mobile.",
                    maxlength: "Aletrnate mobile may not be greater than 20 characters.",
                },
                location : {
                    required : "Please enter your business location.",
                    maxlength: "Location may not be greater than 191 characters.",
                },
                gst_no : {
                    required : "Please enter your business GST number.",
                    maxlength: "GST number may not be greater than 50 characters.",
                },
                description : {
                    required : "Please enter your business description.",
                },
            }),
});
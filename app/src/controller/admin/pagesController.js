const {sequelize,DataTypes} = require('../../index');
const sendMail = require('../common/email');
const sendgridMail = require('../common/email');

const ContactUs = require('../../model/contact_us')(sequelize, DataTypes);
const PrivacyPolicies = require('../../model/privacy_policies')(sequelize, DataTypes);
const TermConditions = require('../../model/term_conditions')(sequelize, DataTypes);
const UserService = require("../../service/user");

const User = new UserService();

const controller = {};

/**
 * @params:      
 * @purpose:     To view contact us listing
*/
controller.contactUs = async (req, res) => {
    await ContactUs.findAll({order: [['id', 'DESC']]}).then(data => {
        return res.render('pages/contactUs', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @purpose:     To view message contact us view
*/
controller.contactUsView = async (req, res) => {
    await ContactUs.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('pages/contactUsView', {data: data, stackScript: '../partials/script/pagesForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request
 * @purpose:     To contact us reply message store
*/
controller.contactUsReplyMessageStore = async (req, res) => {
    await ContactUs.findOne({where: {id: req.params.id}}).then(data => {
        if(data){
            let isReply = req.body.is_reply = data.is_reply = '0' ? '1' : '0';
            let replyMessage = req.body.reply_message;
            (async function(){
                var mesg = 'Hi '+ data.first_name +' '+ data.last_name + req.body.reply_message;
                await sendgridMail.sendgridEmailSend(data.email, config.ADMIN_NAME + '<' + config.ADMIN_EMAIL + '>', 'Reply', mesg, [],  async function (response) {
                    if(response){
                        await ContactUs.update({is_reply:isReply,reply_message:replyMessage}, {where: {id: data.id}});
                        req.toastr.success("Answer send successfully.");
                        return res.redirect('/admin/contact_us');
                    } else{
                        req.toastr.error("Email not send.");
                        return res.redirect('back');
                    } 
                });
            })()
        } 
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To delete contact us
*/
controller.contactUsDelete  = async (req, res) => {
    ContactUs.destroy({where: {id: req.params.id}}).then(data => {
        req.toastr.success("Contact us delete successfully.");
        return res.redirect('back');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @purpose:     To view privacy & policy
*/
controller.privacyPolicy = async (req, res) => {
    await PrivacyPolicies.findOne().then(data => {
        return res.render('pages/privacyPolicy', {data: data, stackScript: '../partials/script/pagesForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request
 * @purpose:     To create/update privacy & policy
*/
controller.privacyPolicyStore = async (req, res) => {
    await PrivacyPolicies.findOne().then(data => {
        if(data){
            PrivacyPolicies.update(req.body, {where: {id: data.id}});
            req.toastr.success("Privacy & policy updated successfully.");
        } else{
            PrivacyPolicies.create(req.body);
            req.toastr.success("Privacy & policy added successfully.");
        }
        return res.redirect('back');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @purpose:     To view Term & conditions
*/
controller.termConditions = async (req, res) => {
    await TermConditions.findOne().then(data => {
        return res.render('pages/termConditions', {data: data, stackScript: '../partials/script/pagesForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request
 * @purpose:     To create/update Term & conditions
*/
controller.termConditionsStore = async (req, res) => {
    await TermConditions.findOne().then(data => {
        if(data){
            TermConditions.update(req.body, {where: {id: data.id}});
            req.toastr.success("Term & conditions updated successfully.");
        } else{
            TermConditions.create(req.body);
            req.toastr.success("Term & conditions added successfully.");
        }
        return res.redirect('back');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

module.exports = controller;
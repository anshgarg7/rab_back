const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];
const emailSend = require('./common/email');
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserService = require("../service/user");


const User = new UserService();
const controller = {};

controller.reset = async (req, res) => {
    const {token} =  req.params;
    let email = await verifyCustomToken(token);
     if(email){
        let user = await User.checkUserExist({reset_token:token,email:email});
        if(user){
       return res.render('reset/index.ejs',{
           email:email,token,error: req.flash('error'),
       });
   }else{
    return res.render('404.ejs',{
           success: false,
           error: true,
           message: 'Page is expired!'
       });
    }
    }else{
        return res.render('404.ejs',{
            success: false,
            error: true,
            message: 'Page is expired!'
        });
    }
    }

   controller.submit_reset = async (req, res) => {
    try {
        const {
            password,
        } = req.body;
        const {token} =  req.params;

        if (password && token) {
            let email = await verifyCustomToken(token);
            if(email){
            let user = await User.getUserOne({reset_token:token,email:email, status: '1'});
            if(user){ 
               const salt = await bcrypt.genSalt();
                    req.body.password = await bcrypt.hash(password, salt);

                    user = await User.update({
                        password: req.body.password,
                        reset_token:null
                    }, {
                        email: email
                    });
                    if (user) {
                        var  adminData = await User.getAdminData();
                        var mesg = "Hii<br/>Your's password successfully updated.<br/>Thank you!";
                        await emailSend.email_send(email, adminData.first_name +' '+adminData.last_name + '<' + adminData.email + '>', 'Successfully Reset Password', mesg,  async function (response) { 
                            
                            return res.redirect('/thankyou');

                        });
                    } else {
                        req.flash('error','Something went wrong!');
                        return res.redirect('back');
                    }
        } else {
            req.flash('error','User not found!');
            return res.redirect('back');

        }
        } else {
            req.flash('error','Token is expired.Please reset link again');
            return res.redirect('back');
        }
    } else {
        return res.render('error/404.ejs');
    }

    } catch (err) {
        return res.render('error/404.ejs');
    }
}

controller.thankyou = async (req,res) =>{
  return res.render('reset/success.ejs',{
        success: true,
        message: 'Thank you!'
    });
}

/************COMMON**************/
verifyCustomToken = async (token) => {
    try {
const decoded = jwt.verify(token, config.SECRET)
return decoded.email;
} catch (error) {
    console.log('>>>>>>>>>',error);
    return false;
}
}
/********************************/
module.exports = controller;
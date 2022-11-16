const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

const UserService = require("../../src/service/user");

const User = new UserService();

module.exports = async(req, res, next) => {
    res.locals.toasts = req.toastr.render();
    res.locals.sessionUser = req.session.data;
    try {
        if (req.session.data.token) {
            var isUser = await User.checkUserExist({ id:req.session.data.id, email:req.session.data.email, role_id:req.session.data.role_id, status:'1' });
            if(isUser){
                jwt.verify(req.session.data.token, config.SECRET, (err, verify) => {
                    if(!err){
                        req.decoded_data = verify.authUser;
                        next();
                    } else{
                        req.toastr.error("Somthing went wrong.");
                        return res.redirect('/admin/login');
                    }
                });
            } else{
                req.toastr.error("Somthing went wrong.");
                return res.redirect('/admin/login');
            }
        } else{
            req.toastr.error("Somthing went wrong.");
            return res.redirect('/admin/login');
        }
    } catch (error){
        req.toastr.error("Somthing went wrong.");
        return res.redirect('/admin/login');
    }
}
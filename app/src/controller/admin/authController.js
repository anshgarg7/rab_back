const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const UserPermissions = require('../../model/user_permissions')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");

const Role = new RoleService();
const User = new UserService();

Users.hasMany(UserPermissions, {
    foreignKey: 'user_id'
});

const controller = {};

/**
 * @params:      
 * @purpose:     To view Super Admin / Admin login form
*/
controller.loginForm = async (req, res, next) => {
    if(req?.session?.data?.token == undefined){
        return res.render('login', {key: 'login', toasts:req.toastr.render()});
    } else{
        return res.redirect('/admin/dashboard');
    }
}

/**
 * @params:      Request
 * @purpose:     To authenticate Super Admin / Admin 
*/
controller.login = async (req, res) => {
    try {
        var superAdminRoleId = await Role.getIdByRoleName('Super Admin');
        var adminRoleId = await Role.getIdByRoleName('Admin');
        const { email, password } = req.body;
        var superAdmin = await User.getUserOne({ email: email, role_id: superAdminRoleId });
        var admin = await User.getUserOne({ email: email, role_id: adminRoleId });
        if ((superAdmin && Object.keys(superAdmin).length) || (admin && Object.keys(admin).length)){
            const getUp = await User.getUserOne({ email: email, status: '1' });
            if (getUp && Object.keys(getUp).length) {
                const match = await bcrypt.compare(password, getUp.password);
                if (match){
                    const token = jwt.sign({ authUser: getUp }, config.SECRET);
                    if(getUp.role_id == superAdminRoleId){
                        req.session.data = { token: token, id: getUp.id, email: getUp.email, first_name: getUp.first_name, last_name: getUp.last_name, role_id: getUp.role_id, image: getUp.photo, mobile_no: getUp.mobile_no }
                    } else {
                        const getpermissions = await Users.findOne({
                            where: {email: getUp.email, status: '1'}, 
                            include: [{model: UserPermissions, required: true}] 
                        }).then((val) => {
                            let obj = {}
                            val.user_permissions.forEach((v) => {
                                obj[v.slug] = v.status
                            })
                            return obj
                        });
                        req.session.data = { token: token, id: getUp.id, email: getUp.email, first_name: getUp.first_name, last_name: getUp.last_name, role_id: getUp.role_id, image: getUp.photo, mobile_no: getUp.mobile_no, admin_permissions : getpermissions}
                    }
                    req.toastr.success("You are logged in successfully.");
                    return res.redirect('/admin/dashboard');
                } else{
                    req.toastr.error("Email and password do not match.");
                    return res.redirect('back');
                }
            } else{
                req.toastr.error("Account not active.");
                return res.redirect('back');
            }
        } else{
            req.toastr.error("Email does not exist.");
            return res.redirect('back');
        }
    } catch (err){
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      Request
 * @purpose:     To logout Super Admin / Admin 
*/
controller.logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect('/admin/login');
    } catch (err){
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

module.exports = controller;
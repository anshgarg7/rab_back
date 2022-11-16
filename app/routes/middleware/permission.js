const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

const {sequelize,DataTypes} = require('../../src/index');
const UserPermissions = require('../../src/model/user_permissions')(sequelize, DataTypes);

const RoleService = require("../../src/service/role");
const UserService = require("../../src/service/user");

const Role = new RoleService();
const User = new UserService();

module.exports = function(slug){
    return async (req, res, next) => {
        try {
            let authUser = req.decoded_data;
            if (authUser) {
                if(authUser?.role_id == '1'){
                    next();
                } else {
                    const roleId = await Role.getIdByRoleName('Admin');
                    const isSubAdmin = await User.checkUserExist({email: authUser?.email, role_id: roleId, status: '1'});
                    if(isSubAdmin){
                        var data = await UserPermissions.findOne({ where: {user_id: isSubAdmin.id, slug: slug} });
                        if(data.status == '1'){
                            next();
                        } else{
                            req.toastr.error("Unauthorized permission.");
                            return res.redirect('back');
                        }
                    } else{
                        req.toastr.error("Unauthorized.");
                        res.redirect('/admin/login');
                    }
                }
            } else {
                req.toastr.error("Invalid token.");
                res.redirect('/admin/login');
            }
        } catch (error){
            req.toastr.error("Somthing went wrong.");
            res.redirect('/admin/login');
        }
    }
}
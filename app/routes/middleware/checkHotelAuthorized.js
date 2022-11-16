const RoleService = require("../../src/service/role");
const UserService = require("../../src/service/user");

const Role = new RoleService();
const User = new UserService();

module.exports = async(req, res, next) => {
    try {
        let authUser = req.decoded_data;
        if (authUser) {
            const roleId = await Role.getIdByRoleName('Hotel');
            const isVendor = await User.checkUserExist({email: authUser.email, role_id: roleId, status: '1'});
            if(isVendor){
                next();
            } else{
                return res.status(401).json({ status: 401, message: "Unauthorized", error: true });
            }
        } else {
            return res.status(400).json({ status: 400, message: "Invalid token", error: err });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Somthing went wrong.", error: error });
    }
}
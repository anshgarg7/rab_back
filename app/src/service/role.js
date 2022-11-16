const {sequelize,DataTypes} = require('../index');
const Roles = require('../model/role')(sequelize, DataTypes);
const Users = require('../model/users')(sequelize, DataTypes);

Roles.hasOne(Users, {
    foreignKey: 'role_id'
});

class RoleService {
    /**
     * @params:      
     * @purpose: To get role_id by role name
    */
    getIdByRoleName(name) {
        return new Promise((resolve, reject) => {
            Roles.findOne({
                attributes:['id'],
                where: {name: name}
            }).then(res => {
                return resolve(res.id);
            }).catch(err => {
                return reject(err);
            });
        });
    }
}

module.exports = RoleService;
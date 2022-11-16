const {sequelize,DataTypes} = require('../index');
const Kycs = require('../model/kyc')(sequelize, DataTypes);

class KYCService {
    register(body) {
        return new Promise((resolve, reject) => {
            return Kycs.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });

        });
    }
}
module.exports = KYCService;
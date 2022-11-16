const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.json')[env];
let db = {};
var Sequelize = require('sequelize');

  const Op = Sequelize.Op;
  const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
const DataTypes = Sequelize.DataTypes;

    let dbHost = config.host,
    dbName = config.database,
    dialect = config.dialect,
    username = config.username,
    pwd = config.password;
    const sequelize = new Sequelize(dbName, username, pwd, {
    host: dbHost,
    port: config.port,
    dialect:dialect,
    operatorsAliases: operatorsAliases,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

db.DataTypes = DataTypes;
db.sequelize = sequelize;

module.exports = db;
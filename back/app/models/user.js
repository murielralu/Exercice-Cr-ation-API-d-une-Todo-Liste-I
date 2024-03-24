const { Sequelize, sequelize } = require('./sequelize-client');

class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING
},{
  sequelize,
  tableName: "user",
});

module.exports = User;

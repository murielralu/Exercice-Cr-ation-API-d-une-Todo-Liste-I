const Sequelize = require('sequelize');
const sequelize = require('./sequelize-client.js');

class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING
},{
  sequelize,
  tableName: "user",
});

module.exports = User;

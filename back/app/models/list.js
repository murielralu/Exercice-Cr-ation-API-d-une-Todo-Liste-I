const Sequelize = require('sequelize');
const sequelize = require('./sequelize-client.js');

class List extends Sequelize.Model {}

List.init({

  title: Sequelize.STRING,
  content: Sequelize.STRING
},{
  sequelize,
  tableName: "list",
});

module.exports = List;
const Sequelize = require('sequelize');
const sequelize = require('../database');

class Priority extends Sequelize.Model {}

Priority.init({

  name: Sequelize.STRING,
  color: Sequelize.STRING,
},{
  sequelize,
  tableName: "priority"
});

module.exports = Priority;
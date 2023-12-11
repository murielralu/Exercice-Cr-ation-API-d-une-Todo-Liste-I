const Sequelize = require('sequelize');
const sequelize = require('../sequelize-client.js');

class Importance extends Sequelize.Model {}

Importance.init({

  name: Sequelize.STRING,
  color: Sequelize.STRING,
},{
  sequelize,
  tableName: "importance"
});

module.exports = Importance;
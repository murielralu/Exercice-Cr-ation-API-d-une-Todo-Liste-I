const Sequelize = require('sequelize');
const sequelize = require('../database');

class ListTodo extends Sequelize.Model {}

ListTodo.init({

  title: Sequelize.STRING,
  content: Sequelize.STRING,
},{
  sequelize,
  tableName: "listTodo"
});

module.exports = ListTodo;
const ListTodo = require('./listTodo');
const Priority = require('./priority');


// une liste a une priorité
ListTodo.belongsTo(Priority, {
  foreignKey: "priority_id",
  as: "priority"
});


// réciproque : une priorité concerne plusieurs listes
Priority.hasMany(ListTodo, {
  as: "ListsTodo"
});

module.exports = { ListTodo, Priority };
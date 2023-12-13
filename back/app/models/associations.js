const List = require('./list');
const Importance = require('./importance');


// une liste a une priorité
List.belongsTo(Importance, {
  foreignKey: "importance_id",
  as: "importance"
});


// réciproque : une priorité concerne plusieurs listes
Importance.hasMany(List, {
  foreignKey: "importance_id",
  as: "lists"
});

module.exports = { List, Importance };
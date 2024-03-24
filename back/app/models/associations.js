const List = require('./list');
const Importance = require('./importance');
const User = require('./user');

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

// un utilisateur a plusieurs listes
User.hasMany(List, {
  foreignKey: "user_id",
  as: "lists"
});

// réciproque : une liste appartient à un utilisateur
List.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

module.exports = { List, Importance, User };
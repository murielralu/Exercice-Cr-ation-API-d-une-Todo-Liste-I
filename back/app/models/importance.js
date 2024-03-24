const Sequelize = require('sequelize'); // Importation de Sequelize.
const sequelize = require('./sequelize-client.js'); // Importation de l'instance sequelize à partir du fichier 'sequelize-client.js'.

class Importance extends Sequelize.Model {} // Déclaration de la classe Importance qui hérite de Sequelize.Model.

Importance.init({ // Initialisation du modèle Importance.
  name: Sequelize.STRING, // Définition de l'attribut 'name' comme une chaîne de caractères.
  color: Sequelize.STRING, // Définition de l'attribut 'color' comme une chaîne de caractères.
},{
  sequelize, // Passage de l'instance sequelize.
  tableName: "importance" // Définition du nom de la table dans la base de données comme 'importance'.
});

module.exports = Importance; // Exportation du modèle Importance pour pouvoir l'utiliser dans d'autres fichiers.
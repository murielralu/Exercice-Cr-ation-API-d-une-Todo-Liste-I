// On charge les variables d’environnement à partir du fichier .env
require('dotenv').config();

// on importe le constructeur Sequelize
const {Sequelize} = require('sequelize');

// on crée une nouvelle instance  Sequelize qui se connecte à l’URL de noytre  base de données PostgreSQL 
const sequelize = new Sequelize(process.env.PG_URL,{
  logging: false, //sont utilisées pour configurer Sequelize. logging: false désactive le logging SQL et define: {...} définit les noms des colonnes pour les timestamps.
  define: {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  }
});
sequelize.authenticate()
  .then(() => console.log('La connexion a été établie avec succès.'))
  .catch(error => console.error('Impossible de se connecter à la base de données:', error));

//exporte l’instance de Sequelize pour que vous puissiez l’utiliser dans d’autres fichiers de votre application.
module.exports = sequelize;
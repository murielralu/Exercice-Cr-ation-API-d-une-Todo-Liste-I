// Chargement des variables d'environnement à partir de .env 
require('dotenv').config();

// Import du module Express
const express = require('express');

const morgan = require('morgan');

//import du middleware de gestion d'erreur (factorisation)
const errorHandler = require('./back/app/middlewares/errorHandler.js');

// Import du module CORS pour répondre aux requêtes d'origines différentes
const cors = require('cors');

// Importe le routeur de l'application à partir du fichier "./back/app/router"
const router = require("./back/app/router");

// Créeation d'une nouvelle application Express
const app = express();


app.use(morgan('combined'));

// Port sur lequel le serveur écoute
const port = 3006;

// Ce middleware CORS autorise les requêtes de toutes les origines
app.use(cors({ origin: "*" }));

// middleware pour analyse des corps des requêtes URL-encoded. 
// Le paramètre "extended: true" pour poster des objets et des tableaux imbriqués.
app.use(express.urlencoded({ extended: true }));

// Ce middleware analyse les corps des requêtes JSON
app.use(express.json());

// Pour utilise le routeur qui est monté sur chemin spécifique: /api
app.use('/api',router);

// Pour utiliser le  middleware de gestion d'erreur 
app.use(errorHandler);


// Démarrage du serveur qui écoute sur le port spécifié
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
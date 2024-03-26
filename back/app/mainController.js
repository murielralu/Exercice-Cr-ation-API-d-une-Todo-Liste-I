// const { List } = require("./models/associations.js"); // Import du model Association
// const User = require('./models/user'); // Import du modèle User
// const bcrypt = require('bcrypt'); // Import de bcrypt:hachage des mots de passe (sécurité)
// const jwt = require('jsonwebtoken'); // Import de jsonwebtoken : gestion des tokens (sécurité)
// const Joi = require('joi'); // Import de  Joi pour la validation des données (sécurité)

// On sécurise la validation du nom, du mot de passe permettant l'inscription et la connexion
// const schema = Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{10,30}$/).required(),

// });

// (?=.*[A-Z]) il faut au moins une majuscule.
// (?=.*[!@#$&*]) il faut au moins un caractère spécial.
// (?=.*[a-z]) il faut au moins une minuscule.
// .{10,30} il faut au moins entre 10 et 30 caractères.

// const mainController = {

// Récupération de toutes les listes de la bdd avec la méthode "FindAll". 
//dans chaque liste il y aura le niveau d'importance de la liste
//   async getAllLists(req, res) {
//     try {// Bloc "try" pour la gestion de serreurs
//       const lists = await List.findAll(
//         { include: 'importance' }
//       );
//       // Envoi des listes récupérées avec un statut 200 (OK)
//       res.status(200).json(lists);
//     }
//     // On gère si erreur pour ne pas planter le serveur +  affichage de l'erreur dans la console
//     catch (error) { // on attrape l'erreur
//       console.error(error);// Affichage dans la console du serveur 
//       //Réponse envoyée avec un statut 500 (Erreur interne du serveur) et envoie d'un message d'erreur dans la console du navigateur
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   },
//   // --------------------------------------------------------------
//   //Requête SQL correspondante à la méthode findAll:
//   // SELECT list.*, importance.name, importance.color
//   // FROM list
//   // LEFT JOIN importance ON list.importance_id = importance.id;
//   // ----------------------------------------------------------------


//   // Récupération d'une liste précise dans a base de données en fonction de l'id avec la méthode "findByPk"
//   async getListById(req, res) {
//     try { // Bloc "try" pour la gestion de serreurs
//       // Récupération de l'id de la liste dans l'url de la requête (dans les params)
//       const listId = Number.parseInt(req.params.id, 10); // on s'assure d'avoir un entier en convertissant la chaîne de caractères en un nombre entier.
//       if (isNaN(listId)) { // si l'id n'est pas un nombre, on gère l'erreur
//         return res.status(400).json({ error: "l'Id de la liste doit être un entier" });
//       }

//       // On récupère la liste ayant l'id demandée dans la bdd
//       const list = await List.findByPk(listId);
//       if (!list) { // si l'id n'a pas de correspondance dans la BDD, on renvoie une réponse 404 (utiliser les outils de développement du navigateur "inspecter")
//         return res.status(404).json({ error: "Liste non trouvée" });
//       } else { // ou sinon on renvoie la liste
//         res.json(list);
//       }
//     } catch (error) { //Si il y a une erreur dans le bloc try, on attrape cette erreur et on la gère
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   },

//   // ------------------------------------------------------------------------
//   //SELECT * FROM lists WHERE id = :listId;
//   // -------------------------------------------------------------------------


//   // Méthode pour créer une liste 
//   async createList(req, res) {

//     try {
//       // Récupération du titre, du contenu et du niveau d'importance de la liste contenu dans le corps de la requte
//       const title = req.body.title;
//       const content = req.body.content;
//       const importance = req.body.importance;

//       // Vérification si le titre de la liste est une chaien de caractères
//       // Si ce n'est pas le cas gestion de l'erreur
//       if (!title || typeof title !== "string") {
//         res.status(400).json({ error: "Missing or invalid body parameter: title" });
//         return;
//       }

//       // Création de la liste avec les infos récupérées: titre, contenu, importance précédement avec la méthode "create"
//       const createdList = await List.create({ title, content, importance });

//       //La liste créée est renvoyée avec un status 201 (créé)
//       res.status(201).json(createdList);

//     } catch (error) { // Si erreur dans le bloc try , on l'attrape ici et on le gère
//       console.error(error); // erreur affichée ds la console du serveur
//       res.status(500).json({ message: 'Erreur serveur' }); // Renvoie une erreur 500 avec un message
//     }
//   },
//   // --------------------------------------------------------------------------
//   // INSERT INTO lists (title, content, importance)
//   // VALUES (:title, :content, :importance);
//   // ---------------------------------------------------------------------------

//   // Méthode pour mettre à jour une liste 
//   async updateList(req, res) {
//     try {
//       // Récupérer l'id de la liste
//       const listId = parseInt(req.params.id);

//       // Gérer erreur potentielle d'ID
//       if (isNaN(listId)) {
//         return res.status(400).json({ error: "List ID should be a valid integer" });
//       }
//       // Récupérer et valider le body
//       const body = req.body;
//       if (!body.title) {
//         return res.status(400).json({ error: "Indiquer un nouveau titre de liste" });
//       }
//       // On récupère la liste dans la BDD 
//       const list = await List.findByPk(listId);
//       if (!list) {
//         return res.status(404).json({ error: "List not found" });
//       }
//       // update() = set() + save()
//       const updatedList = await list.update({
//         title: body.title || list.title,
//       });

//       // On retourne l'entité updated !!
//       res.json(updatedList);
//     }
//     catch (error) {
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   },

//   // ---------------------------------------------------------------------------------
//   //UPDATE lists
//   //SET title = :newTitle
//   // WHERE id = :listId;
//   //--------------------------------------------------------------------------------


//   // Méthode pour supprimer une liste 
//   async deleteList(req, res) {
//     try {
//       // Récupérer l'ID dans les params
//       const listId = Number.parseInt(req.params.id);

//       if (isNaN(listId)) {
//         return res.status(400).json({ error: "List ID should be a valid integer" });
//       }
//       // On récupère la liste dans la BDD 
//       const list = await List.findByPk(listId);
//       if (!list) { // Si elle existe pas ==> 404
//         return res.status(404).json({ error: "List not found" });
//       }
//       // On supprime la liste de la BDD
//       await list.destroy();

//       // On termine la requête sans envoyer de body
//       res.status(204).end();

//     } catch (error) {
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   },

//   // Méthode pour l'inscription d'utilisateur
//   async registerUser(req, res) {
//     try {
//       // Récupération du mot de passe dans la requête et Hachage de ce dernier avant de le stocker dans la bdd
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
//       // Création du nouvel utilisateur avec le nom d'utilisateur récupérer dans la requête et le mot de passe haché
//       const user = await User.create({ username: req.body.username, password: hashedPassword });
  
//       // Suppression du mot de passe avant de renvoyer l'objet utilisateur au navigateur
//       delete user.dataValues.password;

//       // Renvoyez l'utilisateur créé avec le statut 201 (créé) au navigateur
//       res.status(201).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   },
  
//   // Méthode pour la connexion des utilisateurs
//   async loginUser(req, res) {
//     try { // bloc try pour gérer les erreurs
//       // Utilisation de Joi pour valider les données d'entrée (req.body)
//       console.log('Fonction loginUser appelée');
//       const result = schema.validate(req.body);
//       const error = result.error; // si erreur, on récupère l'erreur

//       // S'il y a erreur, on renvoie une erreur 400 avec le message d'erreur
//       if (error) {
//         console.log('Erreur de validation:', error.details[0].message);
//         // On récupère le 1er élément de l'objet "erreur" provenant de joi via la propriété "details" (qui est un tableau)
//         return res.status(400).json({ error: error.details[0].message });
//       }
  
//       // Recherche de l'utilisateur dans la base de données en utilisant le nom d'utilisateur récupérer dans la requête
//       const user = await User.findOne({ where: { username: req.body.username } });
//       // Si l'utilisateur n'est pas trouvé, renvoie une erreur 400
//       if (user == null) { // si user est null ou  undefined, renvoie une erreur 400 avec message
//         console.log('Utilisateur non trouvé');
//         return res.status(400).send('Cannot find user');
//       }
  
//       // Comparaison du mot de passe dans la reqûête avec le mot de passe haché stocké dans la bdd
//       if (await bcrypt.compare(req.body.password, user.password)) {

//         // Si les mots de passe correspondent, cela génère un jeton
//         const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
        
//         // alors on envoie le jeton
//         res.json({ accessToken: accessToken });
//       } else {
//         console.log('Les mots de passe ne correspondent pas');
//         // Sinon on envoie un message d'erreur
//         res.send('password do not match');
//       }
//     } catch (error) {
//       console.log('Erreur serveur:', error); 
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   }
// };

// // On exporte le mainController pour être utilisé dans d'autres fichiers
// // module.exports = mainController;
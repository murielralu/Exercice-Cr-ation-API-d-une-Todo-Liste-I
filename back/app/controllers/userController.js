const User = require('../models/user'); // Import du modèle User
const bcrypt = require('bcrypt'); // Import de bcrypt:hachage des mots de passe (sécurité)
const jwt = require('jsonwebtoken'); // Import de jsonwebtoken : gestion des tokens (sécurité)
const Joi = require('joi'); // Import de  Joi pour la validation des données (sécurité)

// On sécurise la validation du nom, du mot de passe permettant l'inscription et la connexion
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{10,30}$/).required(),

});

const userController = {
  async registerUser(req, res, next) {
    try {
      // Récupération du mot de passe dans la requête et Hachage de ce dernier avant de le stocker dans la bdd
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      // Création du nouvel utilisateur avec le nom d'utilisateur récupérer dans la requête et le mot de passe haché
      const user = await User.create({ username: req.body.username, password: hashedPassword });
      
      // Suppression du mot de passe avant de renvoyer l'objet utilisateur au navigateur
      delete user.dataValues.password;
    
      // Renvoyez l'utilisateur créé avec le statut 201 (créé) au navigateur
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
      
  // Méthode pour la connexion des utilisateurs
  async loginUser(req, res, next) {
    try { // bloc try pour gérer les erreurs
      // Utilisation de Joi pour valider les données d'entrée (req.body)
      console.log('Fonction loginUser appelée');
      const result = schema.validate(req.body);
      const error = result.error; // si erreur, on récupère l'erreur
    
      // S'il y a erreur, on renvoie une erreur 400 avec le message d'erreur
      if (error) {
        console.log('Erreur de validation:', error.details[0].message);
        // On récupère le 1er élément de l'objet "erreur" provenant de joi via la propriété "details" (qui est un tableau)
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // Recherche de l'utilisateur dans la base de données en utilisant le nom d'utilisateur récupérer dans la requête
      const user = await User.findOne({ where: { username: req.body.username } });
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 400
      if (user == null) { // si user est null ou  undefined, renvoie une erreur 400 avec message
        console.log('Utilisateur non trouvé');
        return res.status(400).send('Cannot find user');
      }
      
      // Comparaison du mot de passe dans la reqûête avec le mot de passe haché stocké dans la bdd
      if (await bcrypt.compare(req.body.password, user.password)) {
    
        // Si les mots de passe correspondent, cela génère un jeton
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
            
        // alors on envoie le jeton
        res.json({ accessToken: accessToken });
      } else {
        console.log('Les mots de passe ne correspondent pas');
        // Sinon on envoie un message d'erreur
        res.send('password do not match');
      }
    } catch (error) {
      next(error);
    }
  }
};
module.exports = userController;
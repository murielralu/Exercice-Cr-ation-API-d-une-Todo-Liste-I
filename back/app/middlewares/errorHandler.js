
module.exports = function errorHandler(err,res) {
  console.error(err); // Affichage dans la console du serveur 
  res.status(500).json({ message: 'Erreur serveur' }); //Réponse envoyée avec un statut 500 (Erreur interne du serveur) 
  // et envoie d'un message d'erreur dans la console du navigateur
};
  
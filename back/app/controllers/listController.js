const { List } = require("../models/associations.js"); // Import du model Association


const listController = {

  // Récupération de toutes les listes de la bdd avec la méthode "FindAll". 
  //dans chaque liste il y aura le niveau d'importance de la liste
  async getAllLists(req, res, next) {
    try {// Bloc "try" pour la gestion de serreurs
      const lists = await List.findAll(
        { include: 'importance' }
      );
      // Envoi des listes récupérées avec un statut 200 (OK)
      res.status(200).json(lists);
    }
    // On gère si erreur pour ne pas planter le serveur +  affichage de l'erreur dans la console
    catch (error) { // on attrape l'erreur
      next(error);
    }
  },
  // --------------------------------------------------------------
  //Requête SQL correspondante à la méthode findAll:
  // SELECT list.*, importance.name, importance.color
  // FROM list
  // LEFT JOIN importance ON list.importance_id = importance.id;
  // ----------------------------------------------------------------


  // Récupération d'une liste précise dans a base de données en fonction de l'id avec la méthode "findByPk"
  async getListById(req, res, next) {
    try { // Bloc "try" pour la gestion de serreurs
      // Récupération de l'id de la liste dans l'url de la requête (dans les params)
      const listId = Number.parseInt(req.params.id, 10); // on s'assure d'avoir un entier en convertissant la chaîne de caractères en un nombre entier.
      if (isNaN(listId)) { // si l'id n'est pas un nombre, on gère l'erreur
        return res.status(400).json({ error: "l'Id de la liste doit être un entier" });
      }

      // On récupère la liste ayant l'id demandée dans la bdd
      const list = await List.findByPk(listId);
      if (!list) { // si l'id n'a pas de correspondance dans la BDD, on renvoie une réponse 404 (utiliser les outils de développement du navigateur "inspecter")
        return res.status(404).json({ error: "Liste non trouvée" });
      } else { // ou sinon on renvoie la liste
        res.json(list);
      }
    } catch (error) { //Si il y a une erreur dans le bloc try, on attrape cette erreur et on la gère
      next(error);
    }
  },

  // ------------------------------------------------------------------------
  //SELECT * FROM lists WHERE id = :listId;
  // -------------------------------------------------------------------------


  // Méthode pour créer une liste 
  async createList(req, res, next) {

    try {
      // Récupération du titre, du contenu et du niveau d'importance de la liste contenu dans le corps de la requte
      const title = req.body.title;
      const content = req.body.content;
      const importance = req.body.importance;

      // Vérification si le titre de la liste est une chaien de caractères
      // Si ce n'est pas le cas gestion de l'erreur
      if (!title || typeof title !== "string") {
        res.status(400).json({ error: "Missing or invalid body parameter: title" });
        return;
      }

      // Création de la liste avec les infos récupérées: titre, contenu, importance précédement avec la méthode "create"
      const createdList = await List.create({ title, content, importance });

      //La liste créée est renvoyée avec un status 201 (créé)
      res.status(201).json(createdList);

    } catch (error) { // Si erreur dans le bloc try , on l'attrape ici et on la gère
      next(error);
    }
  },
  // --------------------------------------------------------------------------
  // INSERT INTO lists (title, content, importance)
  // VALUES (:title, :content, :importance);
  // ---------------------------------------------------------------------------

  // Méthode pour mettre à jour une liste 
  async updateList(req, res, next) {
    try {
      // Récupérer l'id de la liste
      const listId = parseInt(req.params.id);

      // Gérer erreur potentielle d'ID
      if (isNaN(listId)) {
        return res.status(400).json({ error: "List ID should be a valid integer" });
      }
      // Récupérer et valider le body
      const body = req.body;
      if (!body.title) {
        return res.status(400).json({ error: "Indiquer un nouveau titre de liste" });
      }
      // On récupère la liste dans la BDD 
      const list = await List.findByPk(listId);
      if (!list) {
        return res.status(404).json({ error: "List not found" });
      }
      // update() = set() + save()
      const updatedList = await list.update({
        title: body.title || list.title,
      });

      // On retourne l'entité updated !!
      res.json(updatedList);
    }
    catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------------------------------
  //UPDATE lists
  //SET title = :newTitle
  // WHERE id = :listId;
  //--------------------------------------------------------------------------------


  // Méthode pour supprimer une liste 
  async deleteList(req, res, next) {
    try {
      // Récupérer l'ID dans les params
      const listId = Number.parseInt(req.params.id);

      if (isNaN(listId)) {
        return res.status(400).json({ error: "List ID should be a valid integer" });
      }
      // On récupère la liste dans la BDD 
      const list = await List.findByPk(listId);
      if (!list) { // Si elle existe pas ==> 404
        return res.status(404).json({ error: "List not found" });
      }
      // On supprime la liste de la BDD
      await list.destroy();

      // On termine la requête sans envoyer de body
      res.status(204).end();

    } catch (error) {
      next(error);
    }
  },
};

module.exports = listController;
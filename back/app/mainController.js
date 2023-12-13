const { List } = require("./models/associations.js");


const mainController = {

  async getAllLists(req, res) {
    try {
      const lists = await List.findAll(
        { include: 'importance' }
      );
      res.status(200).json(lists);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  async getListById(req, res) {
    try {
      const listId = Number.parseInt(req.params.id, 10);
      if (isNaN(listId)) {
        return res.status(400).json({ error: "l'Id de la liste doit être un entier" });
      }

      const list = await List.findByPk(listId);
      if (!list) {
        return res.status(404).json({ error: "Liste non trouvée" });
      } else {
        res.json(list);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  async createList(req, res) {

    try {
      const title = req.body.title;
      const importance = req.body.importance;

      if (!title || typeof title !== "string") {
        res.status(400).json({ error: "Missing or invalid body parameter: title" });
        return;
      }
      const createdList = await List.create({ title, importance });
      res.status(201).json(createdList);

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  async updateList(req, res) {
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
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  async deleteList(req, res) {
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
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

};

module.exports = mainController;
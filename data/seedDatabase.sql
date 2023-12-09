BEGIN;

INSERT INTO "priority"
    ("id", "name", "color")
VALUES
    (1, 'Urgent', '# FF0000'),
    (2, 'Important','# FFA500' ),
    (3, 'Pas important', '# 7FFF00');


INSERT INTO "listTodo"
    ("id", "title", "content", "priority_id")
VALUES
    (1,'Création animation soirée', 'sujets : Musique années 80- 2010 et faits extraordinaires', 2 ),
    (2, 'Décorer la maison', 'Faire le sapin de Noël', 1),
    (3, 'Nettoyage jardin', 'Broyer déchets haies', 3);


SELECT setval('priority_id_seq', (SELECT MAX(id) from "priority"));
SELECT setval('listTodo_id_seq', (SELECT MAX(id) from "listTodo"));

COMMIT;
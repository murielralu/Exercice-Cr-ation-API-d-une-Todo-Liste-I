BEGIN;

INSERT INTO "importance"
    ("id", "name", "color")
VALUES
    (1, 'Urgent', '# FF0000'),
    (2, 'Important','# FFA500' ),
    (3, 'Pas important', '# 7FFF00');


INSERT INTO "list"
    ("id", "title", "content", "importance_id")
VALUES
    (1,'Création animation soirée', 'sujets : Musique années 80- 2010 et faits extraordinaires', 2 ),
    (2, 'Décorer la maison', 'Faire le sapin de Noël', 1),
    (3, 'Nettoyage jardin', 'Broyer déchets haies', 3);


SELECT setval('importance_id_seq', (SELECT MAX(id) from "importance"));
SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));

INSERT INTO "user"
    ("id", "username", "password")
VALUES
    (1, 'Casimir', 'L_ile_aux_enfants$');



COMMIT;
-- 1) MAGASINS
INSERT INTO magasin (id_magasin, nom_magasin, adresse) VALUES
(1, 'Carrefour Centre', 'Centre ville'),
(2, 'Monoprix Lac', 'Lac 1');

-- 2) RAYONS (FK -> magasin)
-- IMPORTANT: nom_rayon est unique=true dans ton entité Rayon,
-- donc on met des noms distincts entre magasins.
INSERT INTO rayon (id_rayon, nom_rayon, id_magasin) VALUES
-- Magasin 1
(1, 'Fruits & Légumes - Carrefour', 1),
(2, 'Produits laitiers - Carrefour', 1),
(3, 'Boucherie - Carrefour', 1),
(4, 'Epicerie - Carrefour', 1),
-- Magasin 2
(5, 'Surgelés - Monoprix', 2),
(6, 'Fruits & Légumes - Monoprix', 2),
(7, 'Produits laitiers - Monoprix', 2),
(8, 'Epicerie - Monoprix', 2);

-- 3) CATEGORIES
INSERT INTO categorie (id, nom_categorie) VALUES
(1, 'Fruits & Légumes'),
(2, 'Produits laitiers'),
(3, 'Boucherie'),
(4, 'Epicerie'),
(5, 'Surgelés');

-- 4) PRODUITS (FK -> categorie, FK -> rayon)
-- Exemple: on met les produits dans les rayons du magasin 1.
INSERT INTO produit (id_produit, nom_produit, id_categorie, id_rayon) VALUES
(1, 'Tomates', 1, 1),
(2, 'Bananes', 1, 1),
(3, 'Lait', 2, 2),
(4, 'Yaourt', 2, 2),
(5, 'Steak', 3, 3),
(6, 'Pâtes', 4, 4),
(7, 'Pizza surgelée', 5, 2);

-- 5) REFERENCEMENT (ManyToMany Magasin <-> Produit)
INSERT INTO referencement (id_magasin, id_produit) VALUES
-- Magasin 1 référence tous les produits
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),

-- Magasin 2 référence un sous-ensemble (exemple)
(2, 1), (2, 3), (2, 4), (2, 6);

-- 6) DISPOSITION_MAGASIN (ordre fixe des rayons dans chaque magasin)
-- Table: disposition_magasin(id_parcour, ordre_visite, id_magasin, id_rayon)
-- Magasin 1
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
 (1, 1, 1, 4), -- Epicerie - Carrefour
 (2, 2, 1, 1), -- Fruits & Légumes - Carrefour
(3, 3, 1, 2), -- Produits laitiers - Carrefour
(4, 4, 1, 3); -- Boucherie - Carrefour

-- Magasin 2 (ordre différent)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
(5, 1, 2, 6), -- Fruits & Légumes - Monoprix
(6, 2, 2, 7), -- Produits laitiers - Monoprix
(8, 4, 2, 8); -- Epicerie - Monoprix
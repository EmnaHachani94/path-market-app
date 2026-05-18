-- =========================
-- DATA.SQL - PathMarket DEV
-- =========================

-- (optionnel) si tu utilises MySQL et que tu veux éviter les erreurs d'ordre FK
SET FOREIGN_KEY_CHECKS = 0;

-- Nettoyage (si besoin, à activer seulement si tu es en ddl-auto=update)
-- DELETE FROM referencement;
-- DELETE FROM disposition_magasin;
-- DELETE FROM produit;
-- DELETE FROM rayon;
-- DELETE FROM categorie;
-- DELETE FROM magasin;

-- 1) MAGASINS
INSERT INTO magasin (id_magasin, nom_magasin, adresse) VALUES
                                                           (1, 'Auchan',       'Adresse Auchan'),
                                                           (2, 'Leclerc',      'Adresse Leclerc'),
                                                           (3, 'Carrefour',    'Adresse Carrefour'),
                                                           (4, 'Intermarché',  'Adresse Intermarché'),
                                                           (5, 'Casino',       'Adresse Casino'),
                                                           (6, 'Monoprix',     'Adresse Monoprix');

-- 2) CATEGORIES (globales)
INSERT INTO categorie (id, nom_categorie) VALUES
                                              (1, 'Fruits & Légumes'),
                                              (2, 'Produits laitiers'),
                                              (3, 'Boucherie'),
                                              (4, 'Epicerie'),
                                              (5, 'Surgelés'),
                                              (6, 'Boissons'),
                                              (7, 'Boulangerie');

-- 3) RAYONS (FK -> magasin)
-- IMPORTANT: nom_rayon est unique=true dans ton entité Rayon,
-- donc noms uniques sur tous les magasins.
INSERT INTO rayon (id_rayon, nom_rayon, id_magasin) VALUES
-- Magasin 1 (Auchan)
(1,  'Fruits & Légumes - Auchan',      1),
(2,  'Produits laitiers - Auchan',     1),
(3,  'Boucherie - Auchan',             1),
(4,  'Epicerie - Auchan',              1),
(5,  'Surgelés - Auchan',              1),
(6,  'Boissons - Auchan',              1),
(7,  'Boulangerie - Auchan',           1),

-- Magasin 2 (Leclerc)
(8,  'Fruits & Légumes - Leclerc',     2),
(9,  'Produits laitiers - Leclerc',    2),
(10, 'Boucherie - Leclerc',            2),
(11, 'Epicerie - Leclerc',             2),
(12, 'Surgelés - Leclerc',             2),
(13, 'Boissons - Leclerc',             2),
(14, 'Boulangerie - Leclerc',          2),

-- Magasin 3 (Carrefour)
(15, 'Fruits & Légumes - Carrefour',   3),
(16, 'Produits laitiers - Carrefour',  3),
(17, 'Boucherie - Carrefour',          3),
(18, 'Epicerie - Carrefour',           3),
(19, 'Surgelés - Carrefour',           3),
(20, 'Boissons - Carrefour',           3),
(21, 'Boulangerie - Carrefour',        3),

-- Magasin 4 (Intermarché)
(22, 'Fruits & Légumes - Intermarché', 4),
(23, 'Produits laitiers - Intermarché',4),
(24, 'Boucherie - Intermarché',        4),
(25, 'Epicerie - Intermarché',         4),
(26, 'Surgelés - Intermarché',         4),
(27, 'Boissons - Intermarché',         4),
(28, 'Boulangerie - Intermarché',      4),

-- Magasin 5 (Casino)
(29, 'Fruits & Légumes - Casino',      5),
(30, 'Produits laitiers - Casino',     5),
(31, 'Boucherie - Casino',             5),
(32, 'Epicerie - Casino',              5),
(33, 'Surgelés - Casino',              5),
(34, 'Boissons - Casino',              5),
(35, 'Boulangerie - Casino',           5),

-- Magasin 6 (Monoprix)
(36, 'Fruits & Légumes - Monoprix',    6),
(37, 'Produits laitiers - Monoprix',   6),
(38, 'Boucherie - Monoprix',           6),
(39, 'Epicerie - Monoprix',            6),
(40, 'Surgelés - Monoprix',            6),
(41, 'Boissons - Monoprix',            6),
(42, 'Boulangerie - Monoprix',         6);

-- 4) PRODUITS (FK -> categorie, FK -> rayon)
-- On crée des produits par magasin (mêmes idées, ids différents)
INSERT INTO produit (id_produit, nom_produit, id_categorie, id_rayon) VALUES
-- Auchan (rayons 1..7)
(1,  'Tomates (Auchan)',           1, 1),
(2,  'Bananes (Auchan)',           1, 1),
(3,  'Lait (Auchan)',              2, 2),
(4,  'Yaourt (Auchan)',            2, 2),
(5,  'Steak (Auchan)',             3, 3),
(6,  'Pâtes (Auchan)',             4, 4),
(7,  'Pizza surgelée (Auchan)',    5, 5),
(8,  'Eau minérale (Auchan)',      6, 6),
(9,  'Baguette (Auchan)',          7, 7),

-- Leclerc (rayons 8..14)
(10, 'Tomates (Leclerc)',          1, 8),
(11, 'Pommes (Leclerc)',           1, 8),
(12, 'Lait (Leclerc)',             2, 9),
(13, 'Fromage (Leclerc)',          2, 9),
(14, 'Poulet (Leclerc)',           3, 10),
(15, 'Riz (Leclerc)',              4, 11),
(16, 'Frites surgelées (Leclerc)', 5, 12),
(17, 'Jus d’orange (Leclerc)',     6, 13),
(18, 'Croissant (Leclerc)',        7, 14),

-- Carrefour (rayons 15..21)
(19, 'Concombres (Carrefour)',     1, 15),
(20, 'Oranges (Carrefour)',        1, 15),
(21, 'Lait (Carrefour)',           2, 16),
(22, 'Beurre (Carrefour)',         2, 16),
(23, 'Steak haché (Carrefour)',    3, 17),
(24, 'Couscous (Carrefour)',       4, 18),
(25, 'Glace vanille (Carrefour)',  5, 19),
(26, 'Cola (Carrefour)',           6, 20),
(27, 'Pain complet (Carrefour)',   7, 21),

-- Intermarché (rayons 22..28)
(28, 'Salade (Intermarché)',       1, 22),
(29, 'Oignons (Intermarché)',      1, 22),
(30, 'Lait (Intermarché)',         2, 23),
(31, 'Yaourt nature (Intermarché)',2, 23),
(32, 'Dinde (Intermarché)',        3, 24),
(33, 'Semoule (Intermarché)',      4, 25),
(34, 'Poisson pané (Intermarché)', 5, 26),
(35, 'Thé glacé (Intermarché)',    6, 27),
(36, 'Pain (Intermarché)',         7, 28),

-- Casino (rayons 29..35)
(37, 'Fraises (Casino)',           1, 29),
(38, 'Raisins (Casino)',           1, 29),
(39, 'Lait (Casino)',              2, 30),
(40, 'Crème fraîche (Casino)',     2, 30),
(41, 'Boeuf (Casino)',             3, 31),
(42, 'Farine (Casino)',            4, 32),
(43, 'Nuggets (Casino)',           5, 33),
(44, 'Eau gazeuse (Casino)',       6, 34),
(45, 'Pain aux céréales (Casino)', 7, 35),

-- Monoprix (rayons 36..42)
(46, 'Tomates (Monoprix)',         1, 36),
(47, 'Avocats (Monoprix)',         1, 36),
(48, 'Lait (Monoprix)',            2, 37),
(49, 'Fromage blanc (Monoprix)',   2, 37),
(50, 'Steak (Monoprix)',           3, 38),
(51, 'Pâtes (Monoprix)',           4, 39),
(52, 'Pizza surgelée (Monoprix)',  5, 40),
(53, 'Soda (Monoprix)',            6, 41),
(54, 'Brioche (Monoprix)',         7, 42);

-- 5) REFERENCEMENT (ManyToMany Magasin <-> Produit)
-- Ici on fait simple: chaque magasin référence ses produits
INSERT INTO referencement (id_magasin, id_produit) VALUES
-- Auchan (1..9)
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),
-- Leclerc (10..18)
(2,10),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),
-- Carrefour (19..27)
(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),
-- Intermarché (28..36)
(4,28),(4,29),(4,30),(4,31),(4,32),(4,33),(4,34),(4,35),(4,36),
-- Casino (37..45)
(5,37),(5,38),(5,39),(5,40),(5,41),(5,42),(5,43),(5,44),(5,45),
-- Monoprix (46..54)
(6,46),(6,47),(6,48),(6,49),(6,50),(6,51),(6,52),(6,53),(6,54);

-- 6) DISPOSITION_MAGASIN (ordre_visite des rayons)
-- Table: disposition_magasin(id_disposition, ordre_visite, id_magasin, id_rayon)

-- Magasin 1 (Auchan) - ordre 1..7
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (1, 1, 1, 4),  -- Epicerie
                                                                                         (2, 2, 1, 1),  -- Fruits & Légumes
                                                                                         (3, 3, 1, 2),  -- Produits laitiers
                                                                                         (4, 4, 1, 7),  -- Boulangerie
                                                                                         (5, 5, 1, 6),  -- Boissons
                                                                                         (6, 6, 1, 5),  -- Surgelés
                                                                                         (7, 7, 1, 3);  -- Boucherie

-- Magasin 2 (Leclerc)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (8,  1, 2, 8),   -- Fruits & Légumes
                                                                                         (9,  2, 2, 14),  -- Boulangerie
                                                                                         (10, 3, 2, 9),   -- Produits laitiers
                                                                                         (11, 4, 2, 13),  -- Boissons
                                                                                         (12, 5, 2, 11),  -- Epicerie
                                                                                         (13, 6, 2, 12),  -- Surgelés
                                                                                         (14, 7, 2, 10);  -- Boucherie

-- Magasin 3 (Carrefour)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (15, 1, 3, 18),  -- Epicerie
                                                                                         (16, 2, 3, 15),  -- Fruits & Légumes
                                                                                         (17, 3, 3, 21),  -- Boulangerie
                                                                                         (18, 4, 3, 16),  -- Produits laitiers
                                                                                         (19, 5, 3, 20),  -- Boissons
                                                                                         (20, 6, 3, 19),  -- Surgelés
                                                                                         (21, 7, 3, 17);  -- Boucherie

-- Magasin 4 (Intermarché)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (22, 1, 4, 22),  -- Fruits & Légumes
                                                                                         (23, 2, 4, 25),  -- Epicerie
                                                                                         (24, 3, 4, 23),  -- Produits laitiers
                                                                                         (25, 4, 4, 28),  -- Boulangerie
                                                                                         (26, 5, 4, 27),  -- Boissons
                                                                                         (27, 6, 4, 26),  -- Surgelés
                                                                                         (28, 7, 4, 24);  -- Boucherie

-- Magasin 5 (Casino)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (29, 1, 5, 35),  -- Boulangerie
                                                                                         (30, 2, 5, 29),  -- Fruits & Légumes
                                                                                         (31, 3, 5, 30),  -- Produits laitiers
                                                                                         (32, 4, 5, 32),  -- Epicerie
                                                                                         (33, 5, 5, 34),  -- Boissons
                                                                                         (34, 6, 5, 33),  -- Surgelés
                                                                                         (35, 7, 5, 31);  -- Boucherie

-- Magasin 6 (Monoprix)
INSERT INTO disposition_magasin (id_disposition, ordre_visite, id_magasin, id_rayon) VALUES
                                                                                         (36, 1, 6, 36),  -- Fruits & Légumes
                                                                                         (37, 2, 6, 37),  -- Produits laitiers
                                                                                         (38, 3, 6, 42),  -- Boulangerie
                                                                                         (39, 4, 6, 39),  -- Epicerie
                                                                                         (40, 5, 6, 41),  -- Boissons
                                                                                         (41, 6, 6, 40),  -- Surgelés
                                                                                         (42, 7, 6, 38);  -- Boucherie

SET FOREIGN_KEY_CHECKS = 1;
package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;

import java.util.List;

public interface IProduitService {
    /** Permet d'ajouter un produit à la base de données.
     * @param produit Le produit à ajouter.
     * @return Le produit ajouté.
     * @throws IllegalArgumentException si le produit est null ou si le nom du produit est vide.
     */
        Produit addProduit(Produit produit);
        /** Permet de rechercher les produits dont le nom commence par un préfixe donné,
         * en ignorant la casse.
     * @param prefixe Le préfixe à rechercher.
     * @return Une liste de produits correspondant au critère de recherche.
         * @throws IllegalArgumentException si le préfixe est null ou vide.
     */
       List<ProduitDto> findTop10ByNomProduitStartingWithIgnoreCase(String prefixe);
}

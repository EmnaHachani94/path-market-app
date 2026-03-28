package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;

import java.util.List;

public interface IProduitService {
        Produit addProduit(Produit produit);
       List<ProduitDto> findTop10ByNomProduitStartingWithIgnoreCase(String prefixe);
}

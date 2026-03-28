package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;
import fr.doranco.pathMarket.repository.IProduitRepository;
import fr.doranco.pathMarket.utils.DtoConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class ProduitService implements IProduitService{

    @Autowired
    private IProduitRepository produitRepository;

     @Override
    public Produit addProduit(Produit produit) {
         produitRepository.save(produit);
         return produit;
     }

    @Override
    public List<ProduitDto> findTop10ByNomProduitStartingWithIgnoreCase(String prefixe) {
        List<Produit> produits = produitRepository.findByNomProduitStartingWithIgnoreCase(prefixe);
        return produits.stream()
                .map(DtoConverter::convert)
                .collect(Collectors.toList());
    }
}

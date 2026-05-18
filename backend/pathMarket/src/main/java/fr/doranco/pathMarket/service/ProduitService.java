package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;
import fr.doranco.pathMarket.repository.IProduitRepository;
import fr.doranco.pathMarket.utils.DtoConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService implements IProduitService {

    @Autowired
    private IProduitRepository produitRepository;

    @Override
    public Produit addProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<ProduitDto> searchByPrefixeAndMagasinOrdered(String prefixe, Long magasinId) {
        if (prefixe == null || prefixe.trim().isEmpty()) {
            throw new IllegalArgumentException("prefixe ne doit pas être vide");
        }
        if (magasinId == null) {
            throw new IllegalArgumentException("magasinId ne doit pas être null");
        }

        return produitRepository.searchProduits(prefixe.trim(), magasinId, PageRequest.of(0, 10));
    }
}

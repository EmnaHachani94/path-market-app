package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.entity.Categorie;
import fr.doranco.pathMarket.repository.ICategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategorieService implements ICategorieService{
    @Autowired
    private ICategorieRepository categorieRepository;

    @Override
    public void addCategorie(Categorie categorie) {
        categorieRepository.save(categorie);
    }
}

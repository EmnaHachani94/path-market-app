package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.repository.IListeCoursesRepository;
import fr.doranco.pathMarket.repository.IMagasinRepository;
import fr.doranco.pathMarket.repository.IProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListeCoursesService {
    @Autowired
    private IListeCoursesRepository listeCoursesRepository;

     @Autowired
    private IProduitRepository produitRepository;

     @Autowired
    private IMagasinRepository magasinRepository;


}

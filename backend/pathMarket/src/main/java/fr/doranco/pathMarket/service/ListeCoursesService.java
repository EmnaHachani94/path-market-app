package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.entity.*;
import fr.doranco.pathMarket.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListeCoursesService {

    private final IListeCoursesRepository listeCoursesRepository;
    private final ILigneListeRepository ligneListeRepository;
    private final IProduitRepository produitRepository;
    private final IMagasinRepository magasinRepository;
    private final IUtilisateurRepository utilisateurRepository;

    public ListeCoursesService(
    IListeCoursesRepository listeCoursesRepository,
    ILigneListeRepository ligneListeRepository,
    IProduitRepository produitRepository,
    IMagasinRepository magasinRepository,
    IUtilisateurRepository utilisateurRepository
    ) {
        this.listeCoursesRepository = listeCoursesRepository;
        this.ligneListeRepository = ligneListeRepository;
        this.produitRepository = produitRepository;
        this.magasinRepository = magasinRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Transactional
    public ListeDeCourses createListe(String nomListe, Long magasinId, Long utilisateurId) {
        Magasin magasin = magasinRepository.findById(magasinId)
                .orElseThrow(() -> new IllegalArgumentException("Magasin introuvable: " + magasinId));

        Utilisateur user = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable: " + utilisateurId));

        ListeDeCourses liste = new ListeDeCourses();
        liste.setNomListe(nomListe);
        liste.setMagasin(magasin);
        liste.setUtilisateur(user);

        // dateDeCreation est set via @PrePersist
        return listeCoursesRepository.save(liste);
    }

    @Transactional
    public LigneListe addLigne(Long listeId, Long produitId, int quantite) {
        ListeDeCourses liste = listeCoursesRepository.findById(listeId)
                .orElseThrow(() -> new IllegalArgumentException("Liste introuvable: " + listeId));

        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new IllegalArgumentException("Produit introuvable: " + produitId));

        LigneListe ligne = new LigneListe();
        ligne.setListeDeCourses(liste);
        ligne.setProduit(produit);
        ligne.setQuantite(quantite);
        // statut par défaut false

        return ligneListeRepository.save(ligne);
    }
}

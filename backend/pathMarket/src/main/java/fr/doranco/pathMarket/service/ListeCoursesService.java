package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.LigneListeResponseDto;
import fr.doranco.pathMarket.model.dto.ListeDeCoursesDetailResponseDto;
import fr.doranco.pathMarket.model.dto.ListeRayonGroupeDto;
import fr.doranco.pathMarket.model.entity.*;
import fr.doranco.pathMarket.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ListeCoursesService {

    private final IListeCoursesRepository listeCoursesRepository;
    private final ILigneListeRepository ligneListeRepository;
    private final IProduitRepository produitRepository;
    private final IMagasinRepository magasinRepository;
    private final IUtilisateurRepository utilisateurRepository;


    private final IDispositionMagasinRepository dispositionMagasinRepository;

    public ListeCoursesService(
            IListeCoursesRepository listeCoursesRepository,
            ILigneListeRepository ligneListeRepository,
            IProduitRepository produitRepository,
            IMagasinRepository magasinRepository,
            IUtilisateurRepository utilisateurRepository,
            // AJOUT
            IDispositionMagasinRepository dispositionMagasinRepository
    ) {
        this.listeCoursesRepository = listeCoursesRepository;
        this.ligneListeRepository = ligneListeRepository;
        this.produitRepository = produitRepository;
        this.magasinRepository = magasinRepository;
        this.utilisateurRepository = utilisateurRepository;

        // AJOUT
        this.dispositionMagasinRepository = dispositionMagasinRepository;
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

        return ligneListeRepository.save(ligne);
    }

    @Transactional
    public ListeDeCoursesDetailResponseDto getListeDetailGroupByRayon(Long listeId) {

        ListeDeCourses liste = listeCoursesRepository.findById(listeId)
                .orElseThrow(() -> new IllegalArgumentException("Liste introuvable: " + listeId));

        Long magasinId = liste.getMagasin().getId();

        // évite NullPointer si jamais ligneListes est null
        List<LigneListe> lignesEntity = Optional.ofNullable(liste.getLigneListes()).orElse(Collections.emptyList());

        // 1) Convertir lignes -> DTO
        List<LigneListeResponseDto> lignesDto = lignesEntity.stream()
                .map(ligne -> {
                    Produit p = ligne.getProduit();
                    Rayon r = p.getRayon();

                    return new LigneListeResponseDto(
                            ligne.getId(),
                            p.getId(),
                            p.getNomProduit(),
                            ligne.getQuantite(),
                            ligne.getStatut(),
                            r.getId(),
                            r.getNomRayon()
                    );
                })
                .toList();

        // 2) Grouper par rayonId
        Map<Long, List<LigneListeResponseDto>> lignesParRayon = lignesDto.stream()
                .collect(Collectors.groupingBy(LigneListeResponseDto::getRayonId));

        // 3) Construire les groupes (rayon + ordreVisite + lignes triées)
        List<ListeRayonGroupeDto> groupes = new ArrayList<>();

        for (Map.Entry<Long, List<LigneListeResponseDto>> entry : lignesParRayon.entrySet()) {
            Long rayonId = entry.getKey();
            List<LigneListeResponseDto> lignes = entry.getValue();

            // Trier les lignes du rayon par nom de produit
            lignes.sort(Comparator.comparing(LigneListeResponseDto::getNomProduit, String.CASE_INSENSITIVE_ORDER));

            String nomRayon = lignes.get(0).getNomRayon();

            int ordreVisite = dispositionMagasinRepository
                    .findByMagasin_IdAndRayon_Id(magasinId, rayonId)
                    .map(DispositionMagasin::getOrdreVisite)
                    .orElse(9999);

            groupes.add(new ListeRayonGroupeDto(rayonId, nomRayon, ordreVisite, lignes));
        }

        // 4) Trier les rayons par ordre de visite
        groupes.sort(Comparator.comparingInt(ListeRayonGroupeDto::getOrdreVisite));

        return new ListeDeCoursesDetailResponseDto(
                liste.getId(),
                liste.getNomListe(),
                liste.getDateDeCreation(),
                liste.getMagasin().getId(),
                liste.getMagasin().getNom(), // champ = nom
                groupes
        );
    }
}
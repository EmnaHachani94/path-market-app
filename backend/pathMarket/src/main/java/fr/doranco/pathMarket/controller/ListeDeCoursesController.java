package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.LigneListeCreateRequestDto;
import fr.doranco.pathMarket.model.dto.ListeDeCoursesCreateRequestDto;
import fr.doranco.pathMarket.model.dto.ListeDeCoursesCreateResponseDto;
import fr.doranco.pathMarket.model.entity.LigneListe;
import fr.doranco.pathMarket.model.entity.ListeDeCourses;
import fr.doranco.pathMarket.service.ListeCoursesService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fr.doranco.pathMarket.model.dto.ListeDeCoursesDetailResponseDto;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/rest/Listes")
public class ListeDeCoursesController {
    private final ListeCoursesService listeCoursesService;


    public ListeDeCoursesController(ListeCoursesService listeCoursesService) {
        this.listeCoursesService = listeCoursesService;
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseEntity<ListeDeCoursesCreateResponseDto> createListe(
            @Valid @RequestBody ListeDeCoursesCreateRequestDto req
    ) {
        ListeDeCourses liste = listeCoursesService.createListe(
                req.getNomListe(),
                req.getMagasinId(),
                req.getUtilisateurId()
        );

        return new ResponseEntity<>(
                new ListeDeCoursesCreateResponseDto(liste.getId()),
                HttpStatus.CREATED
        );
    }

    @PostMapping(value = "/{listeId}/lignes", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Long> addLigne(
            @PathVariable Long listeId,
            @Valid @RequestBody LigneListeCreateRequestDto req
    ) {
        LigneListe ligne = listeCoursesService.addLigne(listeId, req.getProduitId(), req.getQuantite());
        return new ResponseEntity<>(ligne.getId(), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{listeId}", produces = "application/json")
    public ResponseEntity<ListeDeCoursesDetailResponseDto> getListeDetail(@PathVariable Long listeId) {

        ListeDeCoursesDetailResponseDto dto = listeCoursesService.getListeDetailGroupByRayon(listeId);

        return ResponseEntity.ok(dto);
    }
    @PutMapping(value = "/lignes/{ligneId}/quantite", consumes = "application/json")
    public ResponseEntity<Void> updateQuantite(
            @PathVariable Long ligneId,
            @RequestBody Map<String, Integer> payload
    ) {
        Integer nouvelleQuantite = payload.get("quantite");
        listeCoursesService.updateLigneQuantite(ligneId, nouvelleQuantite);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping(value = "/lignes/{ligneId}")
    public ResponseEntity<Void> deleteLigne(@PathVariable Long ligneId) {
        listeCoursesService.deleteLigne(ligneId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value = "/lignes/{ligneId}/statut", consumes = "application/json")
    public ResponseEntity<Void> updateStatut(
            @PathVariable Long ligneId,
            @RequestBody Map<String, Boolean> payload
    ) {
        Boolean nouveauStatut = payload.get("statut");
        listeCoursesService.updateLigneStatut(ligneId, nouveauStatut);
        return ResponseEntity.ok().build();
    }
}

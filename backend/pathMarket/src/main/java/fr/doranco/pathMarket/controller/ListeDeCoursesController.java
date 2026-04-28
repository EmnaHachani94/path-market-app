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
}

package fr.doranco.pathMarket.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class ListeDeCoursesDetailResponseDto {
    private Long ListeId;
    private String nomListe;
    private LocalDate dateDeCreation;
    private Long magasinId;
    private String nomMagasin;
    private List<ListeRayonGroupeDto> rayons;

}

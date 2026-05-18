package fr.doranco.pathMarket.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import  java.util.List;
@Data
@AllArgsConstructor
public class ListeRayonGroupeDto {
    private Long rayonId;
    private String nomRayon;
    private int ordreVisite;
    private List<LigneListeResponseDto> lignes;


}

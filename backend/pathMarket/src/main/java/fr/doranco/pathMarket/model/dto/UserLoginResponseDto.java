package fr.doranco.pathMarket.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginResponseDto {
   // private String token;
    private Long userId;
    private String pseudo;
    private String adresseEmail;
}

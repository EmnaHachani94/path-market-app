package fr.doranco.pathMarket.utils;


import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.dto.UserResponseDto;
import fr.doranco.pathMarket.model.entity.Produit;
import fr.doranco.pathMarket.model.entity.Utilisateur;

/**
 * La classe DtoConverter est une classe utilitaire qui fournit des méthodes statiques pour convertir des objets d'entité en objets de transfert de données (DTO) et vice versa.
 * Elle facilite la transformation des données entre les différentes couches de l'application, en particulier lors de la communication entre le backend et le frontend.
 */
public final class DtoConverter {

    private DtoConverter() {
    }

    public static UserRegisterRequestDto convert(Utilisateur user) {
        UserRegisterRequestDto userRegisterRequestDto = new UserRegisterRequestDto();
        userRegisterRequestDto.setPseudo(user.getPseudo());
        userRegisterRequestDto.setAdresseEmail(user.getAdresseEmail());
        userRegisterRequestDto.setDateDeNaissance(user.getDateDeNaissance());
        //userRegisterRequestDto.setActive(user.isActive());
        return userRegisterRequestDto;
    }
    public static UserResponseDto convertToResponse(Utilisateur user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setPseudo(user.getPseudo());
        dto.setAdresseEmail(user.getAdresseEmail());
        dto.setDateDeNaissance(user.getDateDeNaissance() != null ? user.getDateDeNaissance().toString() : null);
        return dto;
    }

    public static ProduitDto convert(Produit produit) {
        ProduitDto produitDto = new ProduitDto();
        produitDto.setId(produit.getId());
        produitDto.setNomProduit(produit.getNomProduit());
        return produitDto;
    }
}

package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;

import java.util.List;

public interface IUtilisateurService {
    Utilisateur addUtilisateur(Utilisateur utilisateur);
    Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur);
    List<UserRegisterRequestDto> getUsers();
    List<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail);
   // boolean existsByAdresseEmail(String email);
    void supprimerUtilisateur(Long id);
    Utilisateur activerUtilisateur(Long id);
}

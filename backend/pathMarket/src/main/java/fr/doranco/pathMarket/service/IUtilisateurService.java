package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.dto.UserResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface IUtilisateurService {
    Utilisateur addUtilisateur(Utilisateur utilisateur);
    Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur);
    List<UserResponseDto> getUsers();
    Optional<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail);
   // boolean existsByAdresseEmail(String email);
    void supprimerUtilisateur(Long id);
    Utilisateur activerUtilisateur(Long id);
 }

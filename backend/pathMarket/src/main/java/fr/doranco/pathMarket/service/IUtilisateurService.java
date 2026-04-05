package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.dto.UserResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface IUtilisateurService {
    /**
     * Ajouter un utilisateur dans la base de données.
     * @param utilisateur L'utilisateur a ajouté.
     * @return L'utilisateur ajouté.
     * @throws IllegalArgumentException si l'utilisateur est null ou si les données de l'utilisateur sont invalides.
     */
    Utilisateur addUtilisateur(Utilisateur utilisateur);

    /**
     * Mettre à jour les informations d'un utilisateur existant.
     * @param id L'identifiant de l'utilisateur à mettre à jour.
     * @param utilisateur Les nouvelles informations de l'utilisateur.
     * @return L'utilisateur mis à jour.
     * @throws IllegalArgumentException si l'identifiant est null, si l'utilisateur n'existe pas
       ou si les données de l'utilisateur sont invalides.
     */
    Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur);
    /**
     * Récupérer la liste de tous les utilisateurs.
     * @return Une liste de DTO contenant les informations de tous les utilisateurs.
     */
    List<UserResponseDto> getUsers();
    /**
     * Récupérer les informations d'un utilisateur par son adresse email.
     * @param adresseEmail L'adresse email de l'utilisateur à récupérer.
     * @return Un Optional contenant l'utilisateur si trouvé, ou vide sinon.
     */
    Optional<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail);
    /**
     * Récupérer les informations d'un utilisateur par son identifiant.
     * @param id L'identifiant de l'utilisateur à récupérer.
     * @return Un Optional contenant l'utilisateur si trouvé, ou vide sinon.
     */
   // boolean existsByAdresseEmail(String email);
    void supprimerUtilisateur(Long id);
    /**
     * Activer un utilisateur en mettant à jour son statut d'activation.
     * @param id L'identifiant de l'utilisateur à activer.
     * @return L'utilisateur activé.
     */
    Utilisateur activerUtilisateur(Long id);
 }

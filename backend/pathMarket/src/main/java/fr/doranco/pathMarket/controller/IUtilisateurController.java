package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.dto.UserResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface IUtilisateurController {
    /**
     * Ajouter un utilisateur
     *
     * @param utilisateur
     * @return l'identifiant de l'utilisateur créé ou une erreur si les données sont invalides ou si l'utilisateur existe déjà.
     */
    @PostMapping(
            value = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Long> addUtilisateur(@RequestBody Utilisateur utilisateur);

    /**
     * Mettre à jour un utilisateur existant.
     *
     * @param utilisateur
     * @return l'identifiant de l'utilisateur mis à jour ou une erreur si l'utilisateur n'existe pas ou si les données sont invalides.
     */
    @PutMapping("/update/{id}")
    ResponseEntity<Long> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur);

    /**
     * Supprimer un utilisateur par son identifiant.
     *
     * @param id
     * @return un message de succès si l'utilisateur a été supprimé ou une erreur si l'utilisateur n'existe pas.
     */
    ResponseEntity<String> supprimerUtilisateur(Long id);
    //ResponseEntity<Utilisateur> getUtilisateurById(Long id);

    /**
     * Récupérer tous les utilisateurs.
     *
     * @return une liste de tous les utilisateurs ou une erreur si aucun utilisateur n'est trouvé.
     */
    ResponseEntity<List<UserResponseDto>> getAllUsers();

    /**
     * Récupérer un utilisateur par son adresse email.
     *
     * @param adresseEmail
     * @return l'utilisateur correspondant à l'adresse email ou une erreur si aucun utilisateur n'est trouvé avec cette adresse email.
     */
    ResponseEntity<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail);

    /**
     * Activer un utilisateur par son identifiant.
     * @param id
     * @return l'utilisateur activé ou une erreur si l'utilisateur n'existe pas ou si l'activation échoue.
     */
    @PatchMapping(value = "/activation/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Utilisateur> activerUtilisateur(@PathVariable Long id);
}

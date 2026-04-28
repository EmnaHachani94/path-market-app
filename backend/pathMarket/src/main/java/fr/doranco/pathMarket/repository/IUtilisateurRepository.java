package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
/**
 * Repository pour l'entité Utilisateur.
 * Fournit des méthodes pour interagir avec la base de données concernant les utilisateurs.
 * Cette interface étend JpaRepository, ce qui lui permet d'hériter de nombreuses méthodes
 * de base pour la gestion des entités, telles que save, findById, findAll, deleteById, etc.
 */
public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findUtilisateurByAdresseEmail(String adresseEmail);
    List<Utilisateur> findUtilisateurByDateDeNaissanceBetween(LocalDate dateMIx, LocalDate dateMax);
    Boolean existsByAdresseEmail(String email);
}

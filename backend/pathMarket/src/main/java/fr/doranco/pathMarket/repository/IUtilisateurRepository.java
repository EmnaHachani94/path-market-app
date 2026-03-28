package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    List<Utilisateur> findUtilisateurByAdresseEmail(String adresseEmail);
    List<Utilisateur> findUtilisateurByDateDeNaissanceBetween(LocalDate dateMIx, LocalDate dateMax);
    Boolean existsByAdresseEmail(String email);
}

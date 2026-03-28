package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategorieRepository extends JpaRepository<Categorie, Long> {

}

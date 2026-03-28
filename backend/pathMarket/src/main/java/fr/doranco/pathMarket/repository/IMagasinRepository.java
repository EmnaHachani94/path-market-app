package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.Magasin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMagasinRepository extends JpaRepository<Magasin,Long> {
}

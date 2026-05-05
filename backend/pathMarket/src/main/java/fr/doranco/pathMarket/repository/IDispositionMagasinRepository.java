package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.DispositionMagasin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IDispositionMagasinRepository extends JpaRepository<DispositionMagasin, Long> {
    // Pour récupérer l'ordre d'un rayon dans un magasin
    Optional<DispositionMagasin> findByMagasin_IdAndRayon_Id(Long magasinId, Long rayonId);

    // Optionnel (utile après) : récupérer tout le parcours d’un magasin trié
    List<DispositionMagasin> findByMagasin_IdOrderByOrdreVisiteAsc(Long magasinId);
}

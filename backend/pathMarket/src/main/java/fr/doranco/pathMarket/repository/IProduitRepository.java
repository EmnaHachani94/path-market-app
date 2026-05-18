package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProduitRepository extends JpaRepository<Produit, Long> {
    @Query("""
    SELECT new fr.doranco.pathMarket.model.dto.ProduitDto(
        p.id,
        p.nomProduit,
        r.id,
        r.nomRayon,
        d.ordreVisite
    )
    FROM Produit p
    JOIN p.rayon r
    JOIN DispositionMagasin d ON d.rayon = r
    WHERE d.magasin.id = :magasinId
      AND LOWER(p.nomProduit) LIKE LOWER(CONCAT(:prefixe, '%'))
    ORDER BY d.ordreVisite ASC, p.nomProduit ASC
""")
    List<ProduitDto> searchProduits(
            @Param("prefixe") String prefixe,
            @Param("magasinId") Long magasinId,
            Pageable pageable
    );

}
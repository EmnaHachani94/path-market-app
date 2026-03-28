package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProduitRepository extends JpaRepository<Produit, Long> {

    List<Produit> findByNomProduitStartingWithIgnoreCase(String prefixe);

}
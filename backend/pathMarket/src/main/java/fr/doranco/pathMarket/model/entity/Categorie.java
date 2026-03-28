package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "categorie")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter

public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, name = "nom_categorie", length = 50)
    private String nomCategorie;

    @OneToMany(mappedBy = "categorie", cascade = {CascadeType.PERSIST, CascadeType.MERGE}) // On ne supprime PAS les produits si on supprime une catégorie
    private List<Produit> produits;

}

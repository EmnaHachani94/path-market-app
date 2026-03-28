package fr.doranco.pathMarket.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "produit")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter

public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produit")
    private Long id;

    @Column(nullable = false, name = "nom_produit", length = 50)
    private String nomProduit;

    /**
     * Relation ManyToMany inverse : magasins qui référencent ce produit
     */
    @ManyToMany(mappedBy = "produits")
    private List<Magasin> magasins;

    @ManyToOne
    @JoinColumn(name ="id_categorie", nullable = false)
    private Categorie categorie;

    /**
     * Lignes de liste contenant ce produit
     */
    @OneToMany(mappedBy = "produit") // Cherche l'attribut nommé produit dans la classe LigneListe
    private List<LigneListe> ligneListe;

    @ManyToOne
    @JoinColumn(name = "id_rayon", nullable = false)
    private Rayon rayon;
}

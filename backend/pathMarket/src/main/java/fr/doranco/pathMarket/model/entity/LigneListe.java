package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ligne_liste",
        uniqueConstraints = @UniqueConstraint(columnNames = {"id_liste", "id_produit"})) // pas de doublons
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LigneListe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ligne_liste")
    private Long id;

    @Column(nullable = false)
    private int quantite;

    @Column(nullable = false)
    private Boolean statut = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produit", nullable = false)
    private Produit produit; // Cherche l'attribut nommé produit dans la classe LigneListe

    /**
     * Chaque ligne appartient à une liste de courses
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_liste", nullable = false)
    private ListeDeCourses listeDeCourses;

}

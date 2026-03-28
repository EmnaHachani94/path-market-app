package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Table(name = "rayon")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class Rayon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rayon")
    private Long id;

    @Column(name = "nom_rayon", nullable = false, length = 70, unique = true)
    private String nomRayon;

    /**
     * Chaque rayon appartient à un magasin
     * Jamais de cascade côté ManyToOne
     */
   /* @Column(name = "numero", nullable = false)
    private Integer numero;*/

    @ManyToOne //Jamais de cascade si ya ManyToOne
    @JoinColumn(name = "id_magasin", nullable = false)
    private Magasin magasin;

    /**
     * Un rayon possède plusieurs produits.
     */
    @OneToMany(mappedBy = "rayon",fetch = FetchType.LAZY)
    private List<Produit> produits;

    /**
     * Un rayon peut appartenir à plusieurs parcours.
     */
    @OneToMany(mappedBy = "rayon",fetch = FetchType.LAZY)
    private List<DispositionMagasin> parcours;

}



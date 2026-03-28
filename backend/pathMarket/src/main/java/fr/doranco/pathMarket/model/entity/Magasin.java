package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "magasin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class Magasin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_magasin")
    private Long id;

    @Column(nullable = false, name = "nom_magasin", length = 70, unique = true)
    private String nom;

    @Column(length = 70)
    private String adresse;

    @OneToMany(mappedBy = "magasin", cascade = CascadeType.ALL,fetch = FetchType.LAZY) // un magasin possède +ieurs rayons -- si on supprime un magasin, on supprime ses rayons
    private List<Rayon> rayons;

    @OneToMany(mappedBy = "magasin",fetch = FetchType.LAZY)
    private List<ListeDeCourses> listeDeCourses;

    @OneToMany(mappedBy = "magasin",fetch = FetchType.LAZY)
    private  List<DispositionMagasin> parcours;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable
            (name = "referencement",joinColumns = @JoinColumn(name = "id_magasin"),
            inverseJoinColumns = @JoinColumn(name = "id_produit")
    )
    private List<Produit> produits;

}

package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor

public class DispositionMagasin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_disposition")
    private Long id;

    @Column(nullable = false, length = 2)
    private int ordreVisite;


    /**
     * Parcour dans un magasin spécifique
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_magasin", nullable = false)
    private Magasin magasin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rayon", nullable = false)
    private Rayon rayon;
}

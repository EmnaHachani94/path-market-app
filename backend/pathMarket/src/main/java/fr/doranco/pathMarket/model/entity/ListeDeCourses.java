package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "liste_de_courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ListeDeCourses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_liste")
    private Long id;

    @Column(name = "nom_liste", nullable = false)
    private String nomListe;

    @Column(name = "date_de_creation", nullable = false)
    private LocalDate dateDeCreation;

    /**
     * Une liste appartient à un utilisateur.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur")
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_magasin", nullable = false)
    private Magasin magasin;

    @OneToMany(mappedBy = "listeDeCourses")
    private List<LigneListe> ligneListes;

    /**
     * Methode exécutée avant l'insertion en bdd pour enregistrer la date actuelle au moment de l'enregistement.
     */
    @PrePersist
    protected void onCreate() {   // pk protrcted : Visible dans la classe + sous-classes
        dateDeCreation = LocalDate.now();
    }
}

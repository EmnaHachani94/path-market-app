package fr.doranco.pathMarket.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utilisateur")
    private Long id;

    @Column(nullable = false)
    private String pseudo;

    @Column(nullable = false, unique = true, name = "adresse_email", length = 100)
    private String adresseEmail;

    @Column(nullable = false, name = "mot_de_passe", length = 50)
    private String motDePasse;

    @Column(nullable = false)
    private LocalDate dateDeNaissance;

    @Column(nullable = false)
    private boolean active = false;

    public void setActive(boolean active) {
        this.active = active;
    }

    @OneToMany(mappedBy = "utilisateur")
    private List<ListeDeCourses> listeCourses;


}

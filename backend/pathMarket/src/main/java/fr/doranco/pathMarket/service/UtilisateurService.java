package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.UserResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import fr.doranco.pathMarket.repository.IUtilisateurRepository;
import fr.doranco.pathMarket.utils.DtoConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService implements IUtilisateurService {

    private final IUtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurService(IUtilisateurRepository utilisateurRepository,
                              PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        if (utilisateur == null) {
            throw new IllegalArgumentException("L'utilisateur ne peut pas être vide !");
        }
        if (utilisateur.getAdresseEmail() == null || utilisateur.getAdresseEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("L'email est obligatoire !");
        }
        if (utilisateur.getPseudo() == null || utilisateur.getPseudo().trim().isEmpty()
                || utilisateur.getMotDePasse() == null || utilisateur.getMotDePasse().trim().isEmpty()
                || utilisateur.getDateDeNaissance() == null) {
            throw new IllegalArgumentException("Vous devez remplir tous les champs !");
        }

        // Optionnel: majorité
        /*
        if (!estMajeur(utilisateur.getDateDeNaissance())) {
            throw new IllegalArgumentException("Vous devez être majeur.");
        }
        */

        if (utilisateurRepository.existsByAdresseEmail(utilisateur.getAdresseEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }

        // hash mot de passe avant save
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));

        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur) {
        if (id == null) {
            throw new IllegalArgumentException("Id obligatoire pour update !");
        }
        Utilisateur existingUser = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur n'existe pas !"));

        // Mise à jour des champs
        if (utilisateur.getPseudo() != null) {
            existingUser.setPseudo(utilisateur.getPseudo());
        }

        // Si on reçoit un mot de passe non vide, on le re-hash
        if (utilisateur.getMotDePasse() != null && !utilisateur.getMotDePasse().trim().isEmpty()) {
            existingUser.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        }

        if (utilisateur.getDateDeNaissance() != null) {
            existingUser.setDateDeNaissance(utilisateur.getDateDeNaissance());
        }

        // (tu ne mets pas à jour l'email ici dans ton code original)
        return utilisateurRepository.save(existingUser);
    }
    private boolean estMajeur(LocalDate dateDeNaissance) {
        int age = Period.between(dateDeNaissance, LocalDate.now()).getYears();
        return age >= 18;
    }
    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getUsers() {
        List<Utilisateur> users = utilisateurRepository.findAll();
        List<UserResponseDto> dtos = new ArrayList<>();
        for (Utilisateur user : users) {
            dtos.add(DtoConverter.convertToResponse(user));
        }
        return dtos;
    }

    @Override
    public Optional<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail) {
        if (adresseEmail == null || adresseEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("Adresse email obligatoire !");
        }
        return utilisateurRepository.findUtilisateurByAdresseEmail(adresseEmail);
    }

    @Override
    public void supprimerUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur n'existe pas !"));
        utilisateurRepository.delete(utilisateur);
    }

    @Override
    public Utilisateur activerUtilisateur(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Id obligatoire pour activer l'utilisateur !");
        }
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur n'existe pas !"));
        utilisateur.setActive(true);
        return utilisateurRepository.save(utilisateur);
    }
}
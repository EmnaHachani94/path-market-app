package fr.doranco.pathMarket.service;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import fr.doranco.pathMarket.repository.IUtilisateurRepository;
import fr.doranco.pathMarket.utils.DtoConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class UtilisateurService implements IUtilisateurService {

    // @Autowired
    private final IUtilisateurRepository utilisateurRepository;

    public UtilisateurService(IUtilisateurRepository utilisateurRepository) {

        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        if (utilisateur == null) {
            throw new IllegalArgumentException("L'utilisateur ne peut pas être vide !");
        }
        if (utilisateur.getAdresseEmail() == null || utilisateur.getAdresseEmail().trim().isEmpty()) {
            throw new IllegalArgumentException(" L'email est obligatoire! ");
        }/*
        if (!estMajeur(utilisateur.getDateDeNaissance())) {
            throw new IllegalArgumentException(" vous devez être Majeur. ");
        }*/
        if (utilisateur.getPseudo() == null || utilisateur.getMotDePasse() == null) {
            throw new IllegalArgumentException(" vous devez remplir tous les champs !");
        }
        if (utilisateurRepository.existsByAdresseEmail(utilisateur.getAdresseEmail())) {
            throw new RuntimeException("cet email est déjà utilisé !");
        }
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur) {
        if (id == null) {
            throw new IllegalArgumentException("Id obligatoire pour update !");
        }
        Utilisateur existingUser = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur n'existe pas !"));
        existingUser.setPseudo(utilisateur.getPseudo());
        existingUser.setMotDePasse(utilisateur.getMotDePasse());
        existingUser.setDateDeNaissance(utilisateur.getDateDeNaissance());
        return utilisateurRepository.save(existingUser);
    }

    /**
     * Une methode qui vérifie si l'utilisateur est Majeur ou non, retourn true si l'age >= 18ans.
     *
     * @param dateDeNaissance
     * @return
     */

    private boolean estMajeur(LocalDate dateDeNaissance) {
        int age = Period.between(dateDeNaissance, LocalDate.now()).getYears();
        return age >= 18;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserRegisterRequestDto> getUsers() {

        List<Utilisateur> users = utilisateurRepository.findAll();
        List<UserRegisterRequestDto> userRegisterRequestDtos = new ArrayList<>();

        for (Utilisateur user : users) {
            UserRegisterRequestDto userRegisterRequestDto = DtoConverter.convert(user);
            userRegisterRequestDtos.add(userRegisterRequestDto);

        }

        return userRegisterRequestDtos;
    }

    @Override
    public List<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail) {
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

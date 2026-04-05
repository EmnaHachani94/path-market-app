package fr.doranco.pathMarket.controller;


import fr.doranco.pathMarket.model.dto.UserLoginRequestDto;
import fr.doranco.pathMarket.model.dto.UserLoginResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import fr.doranco.pathMarket.repository.IUtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rest/auth")
public class AuthController {

    private final IUtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(IUtilisateurRepository utilisateurRepository,
                          PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserLoginRequestDto req) {

        Utilisateur user = utilisateurRepository
                .findUtilisateurByAdresseEmail(req.getAdresseEmail())
                .orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        boolean ok = passwordEncoder.matches(req.getMotDePasse(), user.getMotDePasse());
        if (!ok) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(
                new UserLoginResponseDto(user.getId(), user.getPseudo(), user.getAdresseEmail()),
                HttpStatus.OK
        );
    }
}
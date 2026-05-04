package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.UserLoginRequestDto;
import fr.doranco.pathMarket.model.dto.UserLoginResponseDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import fr.doranco.pathMarket.repository.IUtilisateurRepository;
import fr.doranco.pathMarket.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/rest/auth")
public class AuthController {

    private final IUtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MessageSource messageSource;

    public AuthController(IUtilisateurRepository utilisateurRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService, MessageSource messageSource) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.messageSource = messageSource;
    }

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginRequestDto req) {

        Utilisateur user = utilisateurRepository
                .findUtilisateurByAdresseEmail(req.getAdresseEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        boolean ok = passwordEncoder.matches(req.getMotDePasse(), user.getMotDePasse());
        if (!ok) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Email ou mot de passe incorrect"));
        }

        String token = jwtService.generateToken(user.getAdresseEmail());

        return new ResponseEntity<>(
                new UserLoginResponseDto(user.getId(), user.getPseudo(), user.getAdresseEmail(), token),
                HttpStatus.OK
        );
    }
}
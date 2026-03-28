package fr.doranco.pathMarket.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
/**
 * Service de gestion des mots de passe utilisant l'algorithme BCrypt.
 *
 * BCrypt est un algorithme de hachage de mot de passe conçu pour être sécurisé contre les attaques par force brute et les attaques par dictionnaire.
 * Il est considéré comme l'un des algorithmes de hachage de mot de passe les plus robustes disponibles aujourd'hui.
 * Le BCryptPasswordEncoder de Spring Security utilise l'algorithme BCrypt pour hacher les mots de passe de manière sécurisée.
 *
 * param encoder L'instance de BCryptPasswordEncoder utilisée pour hacher et vérifier les mots de passe.
 * param strength Le facteur de coût (strength) utilisé pour le hachage. Plus le facteur est élevé, plus le hachage est sécurisé, mais aussi plus il est lent à calculer. La valeur par défaut est 10.
 */

public class BCryptPasswordService implements IpasswordService{
    private final BCryptPasswordEncoder encoder;
    public BCryptPasswordService(int strength){
        this.encoder = new BCryptPasswordEncoder(strength);
    }

    @Override
    public String hashPassword(String rawPassword) throws Exception {
        return "";
    }

    @Override
    public boolean matches(String rawPassword, String hashedPassword) throws Exception {
        return org.springframework.security.crypto.bcrypt.BCrypt.checkpw(rawPassword, hashedPassword);
    }
}

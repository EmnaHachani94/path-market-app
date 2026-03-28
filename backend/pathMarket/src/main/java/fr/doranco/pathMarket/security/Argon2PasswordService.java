package fr.doranco.pathMarket.security;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

public class Argon2PasswordService implements IpasswordService{
    /**
     * Argon2 est un algorithme de hachage de mot de passe conçu pour être sécurisé contre les attaques par force brute et les attaques par dictionnaire.
     * Il est considéré comme l'un des algorithmes de hachage de mot de passe les plus robustes disponibles aujourd'hui.
     * L'Argon2PasswordEncoder de Spring Security utilise l'algorithme Argon2 pour hacher les mots de passe de manière sécurisée.
     * param encoder L'instance de Argon2PasswordEncoder utilisée pour hacher et vérifier les mots de passe.
     * param saltLength La longueur du sel utilisé pour le hachage (en octets).
     * param hashLength La longueur du hachage résultant (en octets).
     * param parallelism Le niveau de parallélisme (nombre de threads) utilisé pour le
     */
    private final Argon2PasswordEncoder encoder;
    public Argon2PasswordService(){
        this.encoder = new Argon2PasswordEncoder(
                16, // salt length
                32, // hash length
                1,  // parallelism
                65536, // memory(64MB)
                3   // iterations
        );
    }
    @Override
    public String hashPassword(String rawPassword) throws Exception {
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String hashedPassword) throws Exception {
        return encoder.matches(rawPassword,hashedPassword);
    }
}

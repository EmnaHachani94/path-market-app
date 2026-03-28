package fr.doranco.pathMarket.security;
/** * Interface pour le service de gestion des mots de passe.
 * Fournit des méthodes pour hacher et vérifier les mots de passe.
 *
 * Cette interface définit les opérations essentielles pour assurer la sécurité des mots de passe dans l'application.
 */
public interface IpasswordService {
    String hashPassword(String rawPassword) throws Exception;
    boolean matches(String rawPassword, String hashedPassword) throws Exception ;
}

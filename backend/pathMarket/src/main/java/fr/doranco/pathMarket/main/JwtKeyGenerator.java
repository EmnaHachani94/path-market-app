package fr.doranco.pathMarket.main;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;

import javax.crypto.SecretKey;

public class JwtKeyGenerator {
    public static void main(String[] args) {

        MacAlgorithm algo = Jwts.SIG.HS256;
        SecretKey Key = algo.key().build();
        String base64Key = java.util.Base64.getEncoder().encodeToString(Key.getEncoded());
        System.out.println("Generated JWT Secret Key (Base64): " + base64Key);
    }
}

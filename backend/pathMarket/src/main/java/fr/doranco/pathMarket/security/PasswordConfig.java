package fr.doranco.pathMarket.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;


@Configuration

public class PasswordConfig {
    @Bean
    public IpasswordService passwordService() {
        return new Argon2PasswordService();
    }
}

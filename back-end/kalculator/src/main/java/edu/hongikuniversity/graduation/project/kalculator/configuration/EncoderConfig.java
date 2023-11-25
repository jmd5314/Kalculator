package edu.hongikuniversity.graduation.project.kalculator.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class EncoderConfig {
    @Bean
    BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }
}

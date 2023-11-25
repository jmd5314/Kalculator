package edu.hongikuniversity.graduation.project.kalculator.configuration;

import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UsersService usersService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/api/users/join", "/api/users/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/posts/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/hello/api-auth-test").authenticated()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .getOrBuild();
    }
}
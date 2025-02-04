package edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.filter;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception.TokenExpiredException;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception.TokenNotValidException;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.service.JwtService;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.model.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final GrantedAuthoritiesMapper authoritiesMapper;

    public JwtAuthenticationProcessingFilter(JwtService jwtService) {
        this.jwtService = jwtService;
        this.authoritiesMapper = new NullAuthoritiesMapper();
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtService.extractAccessToken(request)
                .orElse(null);

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwtService.validateToken(accessToken);
            String username = jwtService.extractUsername(accessToken)
                    .orElse(null);
            jwtService.findByUsername(username)
                    .ifPresent(this::saveAuthentication);
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException();
        } catch (Exception e) {
            throw new TokenNotValidException();
        }
    }


    private void saveAuthentication(User user) {
        CustomUserDetails userDetails = CustomUserDetails.builder()
                .user(user)
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null,
                        authoritiesMapper.mapAuthorities(userDetails.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}

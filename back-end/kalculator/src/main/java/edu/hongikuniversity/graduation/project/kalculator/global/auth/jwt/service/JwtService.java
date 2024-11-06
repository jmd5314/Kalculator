package edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.exception.UsernameDuplicateException;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UserRepository;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception.TokenNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.respository.RefreshTokenRepository;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.token.RefreshToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String USERNAME_CLAIM = "username";
    private static final String BEARER = "Bearer ";

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    /**
     * AccessToken 생성 메서드
     */
    public String createAccessToken(String username) {
        Date now = new Date();
        Claims claims = Jwts.claims();
        claims.put(USERNAME_CLAIM, username);
        claims.setExpiration(new Date(now.getTime() +accessTokenExpirationPeriod));
        return Jwts.builder()
                .setSubject(ACCESS_TOKEN_SUBJECT)
                .setClaims(claims)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * RefreshToken 생성 메서드
     * 생성 후 refreshTokenRepository에 저장
     */

    public String createRefreshToken(String username) {
        Date now = new Date();
        Claims claims = Jwts.claims();
        claims.setExpiration(new Date(now.getTime() + refreshTokenExpirationPeriod));
        String token = Jwts.builder()
                .setSubject(REFRESH_TOKEN_SUBJECT)
                .setClaims(claims)
                .signWith(getSigningKey())
                .compact();

        RefreshToken refreshToken = RefreshToken.builder()
                .username(username)
                .token(token)
                .build();

        refreshTokenRepository.save(refreshToken);
        return token;
    }

    /**
     * RefreshToken과 AccessToken을 응답 헤더에 넣어주는 메서드
     */
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        setAccessTokenHeader(response, accessToken);
        setRefreshTokenHeader(response, refreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }

    /**
     * Bearer 를 제거하여 refreshToken만 추출해 내는 메서드
     */

    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * Bearer 를 제거하여 accessToken만 추출해 내는 메서드
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    /**
     * accessToken에서 username을 추출해 내는 메서드
     */
    public Optional<String> extractUsername(String accessToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();

            return Optional.ofNullable(claims.get(USERNAME_CLAIM, String.class)); // username 클레임 가져오기
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    /**
     * AccessToken을 응답 헤더에 넣어주는 메서드
     */
    private void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    /**
     * RefreshToken을 응답 헤더에 넣어주는 메서드
     */
    private void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    /**
     * 해당 토큰이 유효한지 검증하는 메서드
     */

    public void validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            log.error("토큰이 만료되었습니다. {}", e.getMessage());
            throw e;
        }
        catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            throw e;
        }
    }

    private Key getSigningKey()  {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName());
    }

    public void validateUsername(String username) {
        userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameDuplicateException(username));

    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public RefreshToken findByToken(String refreshToken) {
        return refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(TokenNotFoundException::new);
    }
}

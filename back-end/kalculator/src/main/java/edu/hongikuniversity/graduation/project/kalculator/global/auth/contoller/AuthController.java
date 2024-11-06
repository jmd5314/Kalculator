package edu.hongikuniversity.graduation.project.kalculator.global.auth.contoller;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserLoginRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserLoginResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UserService;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception.TokenNotValidException;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.service.JwtService;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.token.RefreshToken;
import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserLoginResponse>> login(@RequestBody UserLoginRequest request, HttpServletResponse response) {
        UserLoginResponse loginResponse = userService.login(request);
        String accessToken = jwtService.createAccessToken(loginResponse.username());
        String refreshToken = jwtService.createRefreshToken(loginResponse.username());
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        return ResponseEntity.ok().body(ApiResponse.success(loginResponse));
    }

    @GetMapping("/reissue")
    public ResponseEntity<ApiResponse<String>> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request)
                .orElseThrow(TokenNotValidException::new);
        jwtService.validateToken(refreshToken);
        RefreshToken token = jwtService.findByToken(refreshToken);
        String username = token.getUsername();
        jwtService.validateUsername(username);
        String reIssuedRefreshToken = jwtService.createRefreshToken(username);
        jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(username), reIssuedRefreshToken);
        return ResponseEntity.ok().body(ApiResponse.success("토큰이 재발급 되었습니다."));
    }
}

package edu.hongikuniversity.graduation.project.kalculator.configuration;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import edu.hongikuniversity.graduation.project.kalculator.utils.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;
import java.util.List;
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final UsersService usersService;
    private final String secretKey;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 요청 URI 추출
        String requestUri = request.getRequestURI();
        if (isAuthorizationExcluded(request,requestUri)) {
            // 이러한 요청에 대한 로깅을 건너뛰기
            filterChain.doFilter(request, response);
            return;
        }
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization: {}",authorization);
        if(authorization==null||!authorization.startsWith("Bearer ")){
            log.error("Authorization 을 잘못 보냈습니다");
            filterChain.doFilter(request,response);
            return;
        }
        //Token 꺼내기
        String token = authorization.split(" ")[1];

        //Token Expired 되었는지 여부
        if(JwtTokenUtil.isExpired(token,secretKey)){
            log.error("Token 이 만료되었습니다");
            filterChain.doFilter(request,response);
            return;
        }
        //UserId Token에서 꺼내기
        String userId = JwtTokenUtil.getUsersId(token, secretKey);
        log.info("userId:{}", userId);
        // 권한 부여
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userId, null, List.of(new SimpleGrantedAuthority("USER")));
        //Detail을 넣어줍니다.
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request,response);
    }
    private boolean isAuthorizationExcluded(HttpServletRequest request,String requestUri) {
        return requestUri.contains("/join") ||
                requestUri.contains("/login");
    }
}

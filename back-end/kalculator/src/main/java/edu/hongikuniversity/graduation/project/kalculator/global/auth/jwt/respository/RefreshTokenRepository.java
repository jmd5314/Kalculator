package edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.respository;

import edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String refreshToken);
}

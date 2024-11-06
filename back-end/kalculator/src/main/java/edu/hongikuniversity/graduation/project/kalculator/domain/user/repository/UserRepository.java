package edu.hongikuniversity.graduation.project.kalculator.domain.user.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Optional<User>findByEmail(String email);
}

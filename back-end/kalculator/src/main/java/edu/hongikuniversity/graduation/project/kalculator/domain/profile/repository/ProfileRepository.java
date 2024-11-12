package edu.hongikuniversity.graduation.project.kalculator.domain.profile.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile,Long> {

    @Query("select p from Profile p join fetch p.user where p.user = :user")
    Optional<Profile> findByUser(User user);

}

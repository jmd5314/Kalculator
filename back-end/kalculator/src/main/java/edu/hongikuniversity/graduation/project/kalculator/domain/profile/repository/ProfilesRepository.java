package edu.hongikuniversity.graduation.project.kalculator.domain.profile.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfilesRepository extends JpaRepository<Profile,Long> {
}

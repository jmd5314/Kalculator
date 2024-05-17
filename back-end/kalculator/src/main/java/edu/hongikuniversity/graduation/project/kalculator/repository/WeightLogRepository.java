package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeightLogRepository extends JpaRepository<WeightLog, Long> {

    Optional<WeightLog> findByUsersAndDate(Users users, LocalDate date);
}

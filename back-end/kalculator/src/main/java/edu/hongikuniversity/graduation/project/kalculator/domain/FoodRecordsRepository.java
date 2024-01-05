package edu.hongikuniversity.graduation.project.kalculator.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface FoodRecordsRepository extends JpaRepository<FoodRecords,Long> {
    Optional<FoodRecords> findByDateAndUsers(LocalDate date, Users users);

    Optional<FoodRecords> findByDate(LocalDate date);
}

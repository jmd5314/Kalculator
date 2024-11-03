package edu.hongikuniversity.graduation.project.kalculator.domain.food.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface FoodRecordsRepository extends JpaRepository<FoodRecord,Long> {
    Optional<FoodRecord> findByDateAndUsers(LocalDate date, Users users);

    Optional<FoodRecord> findByDate(LocalDate date);
}

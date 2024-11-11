package edu.hongikuniversity.graduation.project.kalculator.domain.food.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FoodRecordRepository extends JpaRepository<FoodRecord, Long>, CustomFoodRecordRepository {

   List<FoodRecord> findByDateAndUser(LocalDate date, User user);

}

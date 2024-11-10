package edu.hongikuniversity.graduation.project.kalculator.domain.food.repository;

import com.querydsl.core.Tuple;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealTypeResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface CustomFoodRecordRepository {
    List<Tuple> getMealTypeCalories(LocalDate date, User user);

    List<MealType> getMealTypes(LocalDate date, User user);

}

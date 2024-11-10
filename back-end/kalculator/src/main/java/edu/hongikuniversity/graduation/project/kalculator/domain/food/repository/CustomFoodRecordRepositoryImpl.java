package edu.hongikuniversity.graduation.project.kalculator.domain.food.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealTypeResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.QFoodRecord.foodRecord;

@RequiredArgsConstructor
public class CustomFoodRecordRepositoryImpl implements CustomFoodRecordRepository {
    private final JPAQueryFactory queryFactory;


    @Override
    public List<Tuple> getMealTypeCalories(LocalDate date, User user) {
        return queryFactory
                .select(foodRecord.mealType, foodRecord.calories.sum())
                .from(foodRecord)
                .where(foodRecord.date.eq(date)
                        .and(foodRecord.user.eq(user)))
                .groupBy(foodRecord.mealType)
                .fetch();
    }

    @Override
    public List<MealType> getMealTypes(LocalDate date, User user) {
        return queryFactory
                .select(foodRecord.mealType)
                .from(foodRecord)
                .where(foodRecord.date.eq(date)
                        .and(foodRecord.user.eq(user))
                        .and(foodRecord.mealType.ne(MealType.DESSERT))
                )
                .fetch();
    }
}

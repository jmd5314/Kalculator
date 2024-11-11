package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;

import java.util.EnumMap;

public record FoodRecordMealTypeResponse(
        int breakfast,
        int lunch,
        int dinner,
        int dessert
) {
    public static FoodRecordMealTypeResponse from(EnumMap<MealType, Integer> caloriesMap) {
        return new FoodRecordMealTypeResponse(caloriesMap.get(MealType.BREAKFAST),
                caloriesMap.get(MealType.LUNCH),
                caloriesMap.get(MealType.DINNER),
                caloriesMap.get(MealType.DESSERT)
        );
    }
}

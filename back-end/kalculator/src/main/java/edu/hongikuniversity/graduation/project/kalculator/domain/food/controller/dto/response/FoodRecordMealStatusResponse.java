package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;

import java.util.EnumMap;

public record FoodRecordMealStatusResponse(
        boolean breakfast,
        boolean lunch,
        boolean dinner
) {
    public static FoodRecordMealStatusResponse from(EnumMap<MealType, Boolean> statusMap) {
        return new FoodRecordMealStatusResponse(
                statusMap.get(MealType.BREAKFAST),
                statusMap.get(MealType.LUNCH),
                statusMap.get(MealType.DINNER)
        );
    }

}

package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.request;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;

public record FoodRecordSaveRequest(
        String mealType,
        String name,
        double calories,
        double carbohydrates,
        double proteins,
        double fats,
        int quantity
) {
    public static FoodRecord toEntity(FoodRecordSaveRequest request){
        return FoodRecord.builder()
                .mealType(MealType.valueOf(request.mealType()))
                .name(request.name)
                .calories(request.calories)
                .carbohydrates(request.carbohydrates)
                .proteins(request.proteins)
                .fats(request.fats)
                .quantity(request.quantity)
                .build();
    }

}

package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

public record FoodRecordTotalResponse(
        int totalCalories,
        int totalCarbohydrates,
        int totalProteins,
        int totalFats
) {
}

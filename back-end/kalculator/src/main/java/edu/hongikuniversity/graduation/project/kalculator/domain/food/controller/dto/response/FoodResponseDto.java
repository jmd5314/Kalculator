package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FoodResponseDto {
    Integer totalCalories;
    Integer totalCarbohydrates;
    Integer totalProteins;
    Integer totalFats;
    @Builder
    public FoodResponseDto(int totalCalories, int totalCarbohydrates, int totalProteins, int totalFats){
        this.totalCalories = totalCalories;
        this.totalCarbohydrates = totalCarbohydrates;
        this.totalProteins = totalProteins;
        this.totalFats = totalFats;
    }
}

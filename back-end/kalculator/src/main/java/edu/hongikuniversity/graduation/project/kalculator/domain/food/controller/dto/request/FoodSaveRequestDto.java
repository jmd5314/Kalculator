package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodSaveRequestDto {
    private String mealType;
    private String foodName;
    private double calories;
    private double carbohydrates;
    private double proteins;
    private double fats;
    private double quantity;

}

package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MealStatusResponseDto {
    private boolean breakfast;
    private boolean lunch;
    private boolean dinner;
}

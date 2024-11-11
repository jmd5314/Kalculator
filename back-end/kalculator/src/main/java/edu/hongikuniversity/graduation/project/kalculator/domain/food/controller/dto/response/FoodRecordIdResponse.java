package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;

public record FoodRecordIdResponse(Long id) {
    public static FoodRecordIdResponse from(FoodRecord foodRecord) {
        return new FoodRecordIdResponse(foodRecord.getId());
    }
}

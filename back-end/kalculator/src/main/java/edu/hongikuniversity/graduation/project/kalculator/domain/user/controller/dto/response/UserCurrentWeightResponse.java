package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;

public record UserCurrentWeightResponse(double currentWeight) {
    public static UserCurrentWeightResponse from(User user){
        return new UserCurrentWeightResponse(user.getCurrentWeight());
    }
}

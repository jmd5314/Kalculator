package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;

public record ProfileCurrentWeightResponse(double currentWeight) {
    public static ProfileCurrentWeightResponse from(Profile profile){
        return new ProfileCurrentWeightResponse(profile.getCurrentWeight());
    }
}

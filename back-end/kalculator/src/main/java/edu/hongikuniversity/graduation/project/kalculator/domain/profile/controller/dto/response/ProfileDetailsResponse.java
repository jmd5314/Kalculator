package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.*;

public record ProfileDetailsResponse(
        String nickname,
        double currentWeight,
        double targetWeight,
        double weightDifference,
        int age,
        double height,
        Gender gender,
        double weight,
        ActivityLevel activityLevel,
        DietMode dietMode
) {

    public static ProfileDetailsResponse from(Profile profile) {
        return new ProfileDetailsResponse(
                profile.getNickname(),
                profile.getCurrentWeight(),
                profile.getTargetWeight(),
                profile.getWeightDifference(),
                profile.getAge(),
                profile.getHeight(),
                profile.getGender(),
                profile.getWeight(),
                profile.getActivityLevel(),
                profile.getDietMode()
        );
    }

}

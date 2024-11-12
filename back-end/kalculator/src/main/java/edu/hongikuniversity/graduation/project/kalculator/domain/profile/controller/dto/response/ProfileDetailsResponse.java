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
                profile.getUser().getNickname(),
                profile.getUser().getCurrentWeight(),
                profile.getTargetWeight(),
                Math.abs(profile.getUser().getCurrentWeight() - profile.getWeight()),
                profile.getAge(),
                profile.getHeight(),
                profile.getGender(),
                profile.getWeight(),
                profile.getActivityLevel(),
                profile.getDietMode()
        );
    }

}

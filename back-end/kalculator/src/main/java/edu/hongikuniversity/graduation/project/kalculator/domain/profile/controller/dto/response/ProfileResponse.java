package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.*;

public record ProfileResponse(
        Long id,
        String nickname,
        double targetWeight,
        int recommendedCalories,
        int recommendedCarbohydrates,
        int recommendedProteins,
        int recommendedFats,
        int age,
        Gender gender,
        Double height,
        Double weight,
        Double currentWeight,
        ActivityLevel activityLevel,
        PurposeOfUse purposeOfUse,
        DietMode dietMode
) {

    public static ProfileResponse from(Profile profile) {
        return new ProfileResponse(
                profile.getId(),
                profile.getNickname(),
                profile.getTargetWeight(),
                profile.getRecommendedCalories(),
                profile.getRecommendedCarbohydrates(),
                profile.getRecommendedProteins(),
                profile.getRecommendedFats(),
                profile.getAge(),
                profile.getGender(),
                profile.getHeight(),
                profile.getWeight(),
                profile.getCurrentWeight(),
                profile.getActivityLevel(),
                profile.getPurposeOfUse(),
                profile.getDietMode()
        )
    }
}

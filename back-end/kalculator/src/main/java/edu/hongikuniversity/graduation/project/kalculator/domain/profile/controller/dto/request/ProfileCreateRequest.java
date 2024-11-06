package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.ActivityLevel;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Gender;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.PurposeOfUse;

public record ProfileCreateRequest(
        String nickname,
        double targetWeight,
        int age,
        Gender gender,
        double height,
        double weight,
        ActivityLevel activityLevel,
        PurposeOfUse purposeOfUse,
        DietMode dietMode
) {

}

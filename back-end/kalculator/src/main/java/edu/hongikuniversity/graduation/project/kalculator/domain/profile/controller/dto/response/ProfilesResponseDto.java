package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.ActivityLevel;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.PurposeOfUse;
import lombok.Getter;

@Getter
public class ProfilesResponseDto {
    private Long profileId;
    private String nickname;
    private Double targetWeight;
    private Integer recommendedCalories;
    private Integer recommendedCarbohydrates;
    private Integer recommendedProteins;
    private Integer recommendedFats;
    private Integer age;
    private Gender gender;
    private Double height;
    private Double weight;
    private Double currentWeight;
    private ActivityLevel activityLevel;
    private PurposeOfUse purposeOfUse;
    private DietMode dietMode;
    public ProfilesResponseDto(Profiles entity){
        this.profileId = entity.getProfileId();
        this.nickname = entity.getNickname();
        this.targetWeight = entity.getTargetWeight();
        this.age = entity.getAge();
        this.gender = entity.getGender();
        this.height = entity.getHeight();
        this.weight = entity.getWeight();
        this.currentWeight = entity.getCurrentWeight();
        this.activityLevel = entity.getActivityLevel();
        this.dietMode = entity.getDietMode();
        this.purposeOfUse = entity.getPurposeOfUse();
        this.recommendedCalories = entity.getRecommendedCalories();
        this.recommendedCarbohydrates = entity.getRecommendedCarbohydrates();
        this.recommendedProteins = entity.getRecommendedProteins();
        this.recommendedFats = entity.getRecommendedFats();
    }
}

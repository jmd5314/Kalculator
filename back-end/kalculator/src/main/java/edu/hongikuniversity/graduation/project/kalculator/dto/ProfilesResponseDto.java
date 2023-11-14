package edu.hongikuniversity.graduation.project.kalculator.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;

public class ProfilesResponseDto {
    private Long profileId;
    private String nickname;
    private double targetWeight;
    private double recommendedCalories;
    private double recommendedCarbohydrates;
    private double recommendedProteins;
    private double recommendedFats;
    private int age;
    private Gender gender;
    private double height;
    private double weight;
    private ActivityLevel activityLevel;
    private PurposeOfUse purposeOfUse;
    private DietMode dietMode;
    private Users users;
    public ProfilesResponseDto(Profiles entity){
        this.profileId = entity.getProfileId();
        this.nickname = entity.getNickname();
        this.targetWeight = entity.getTargetWeight();
        this.age = entity.getAge();
        this.gender = entity.getGender();
        this.height = entity.getHeight();
        this.weight = entity.getWeight();
        this.activityLevel = entity.getActivityLevel();
        this.dietMode = entity.getDietMode();
        this.purposeOfUse = entity.getPurposeOfUse();
        this.recommendedCalories = entity.getRecommendedCalories();
        this.recommendedCarbohydrates = entity.getRecommendedCarbohydrates();
        this.recommendedProteins = entity.getRecommendedProteins();
        this.recommendedFats = entity.getRecommendedFats();
        this.users = entity.getUsers();
    }
}

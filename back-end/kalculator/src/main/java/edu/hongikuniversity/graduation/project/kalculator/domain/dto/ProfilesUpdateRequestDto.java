package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfilesUpdateRequestDto {
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
    @Builder
    public ProfilesUpdateRequestDto(String nickname,double targetWeight,int age,Gender gender,double height,double weight
            ,ActivityLevel activityLevel,PurposeOfUse purposeOfUse, DietMode dietMode,Users users){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.dietMode = dietMode;
        this.users = users;
    }
}

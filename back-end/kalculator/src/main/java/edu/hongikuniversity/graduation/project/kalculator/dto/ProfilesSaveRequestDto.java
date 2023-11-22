package edu.hongikuniversity.graduation.project.kalculator.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfilesSaveRequestDto {
    private String nickname;
    private double targetWeight;
    private int age;
    private Gender gender;
    private double height;
    private double weight;
    private ActivityLevel activityLevel;
    private PurposeOfUse purposeOfUse;
    private DietMode dietMode;
    @Builder
    public ProfilesSaveRequestDto(String nickname,double targetWeight,int age,Gender gender,double height,double weight
    ,ActivityLevel activityLevel,PurposeOfUse purposeOfUse,DietMode dietMode){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.dietMode = dietMode;
    }
    public Profiles toEntity(){
        return Profiles.builder()
                .nickname(nickname)
                .targetWeight(targetWeight)
                .age(age)
                .gender(gender)
                .height(height)
                .weight(weight)
                .activityLevel(activityLevel)
                .purposeOfUse(purposeOfUse)
                .dietMode(dietMode)
                .build();
    }
    public Gender getGenderEnum() {
        return Gender.valueOf(this.gender);
    }

    public ActivityLevel getActivityLevelEnum() {
        return ActivityLevel.valueOf(this.activityLevel);
    }

    public PurposeOfUse getPurposeOfUseEnum() {
        return PurposeOfUse.valueOf(this.purpose);
    }
}

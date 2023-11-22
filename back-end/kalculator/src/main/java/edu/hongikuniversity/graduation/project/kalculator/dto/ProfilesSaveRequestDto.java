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
    private String gender;
    private double height;
    private double weight;
    private String activityLevel;
    private String purposeOfUse;
    @Builder
    public ProfilesSaveRequestDto(String nickname,double targetWeight,int age,String gender,double height,double weight
    ,String activityLevel,String purposeOfUse){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
    }
    public Profiles toEntity(){
        return Profiles.builder()
                .nickname(nickname)
                .targetWeight(targetWeight)
                .age(age)
                .gender(Gender.valueOf(gender.toUpperCase()))
                .height(height)
                .weight(weight)
                .activityLevel(ActivityLevel.valueOf(activityLevel.toUpperCase()))
                .purposeOfUse(PurposeOfUse.valueOf(purposeOfUse.toUpperCase()))
                .build();
    }
}

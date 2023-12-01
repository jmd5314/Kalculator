package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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
    private Users users;
    @Builder
    public ProfilesSaveRequestDto(String nickname,double targetWeight,int age,String gender,double height,double weight
    ,String activityLevel,String purposeOfUse,Users users){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.users = users;
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
                .users(users)
                .build();
    }
}

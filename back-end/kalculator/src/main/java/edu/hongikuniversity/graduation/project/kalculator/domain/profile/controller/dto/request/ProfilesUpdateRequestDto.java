package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.ActivityLevel;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.PurposeOfUse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfilesUpdateRequestDto {
    private String nickname;
    private Double targetWeight;
    private Integer age;
    private String gender;
    private Double height;
    private Double weight;
    private String activityLevel;
    private String purposeOfUse;
    @Builder
    public ProfilesUpdateRequestDto(String nickname,double targetWeight,int age,String gender,double height,double weight
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
    public Profile toEntity(){
        return Profile.builder()
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

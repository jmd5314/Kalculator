package edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Profiles {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    private String nickname;
    private Double targetWeight;
    private Integer recommendedCalories;
    private Integer recommendedCarbohydrates;
    private Integer recommendedProteins;
    private Integer recommendedFats;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Double height;
    private Double weight;
    private Double currentWeight;
    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;
    @Enumerated(EnumType.STRING)
    private PurposeOfUse purposeOfUse;
    @Enumerated(EnumType.STRING)
    private DietMode dietMode;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    private Double calculateBMR(Double weight,Double height,Integer age,Gender gender) {
        double bmr = 0.0;
        if(gender==Gender.MALE){
            bmr = (9.99*weight)+(6.25*height) - (4.95*age)+5;
        }
        else{
            bmr = (9.99*weight)+(6.25*height) - (4.95*age)-161;
        }
        return bmr;
    }
    private Double calculateRMR(Double bmr,ActivityLevel activityLevel){
        double rmr = 0.0;
        if(activityLevel==ActivityLevel.LOW_ACTIVITY)
            rmr = bmr*1.5;
        else if(activityLevel==ActivityLevel.GENERAL_ACTIVITY)
            rmr = bmr*1.7;
        else
            rmr = bmr*1.9;
        return rmr;
    }
    private Integer calculateRecommendedCalories(Double rmr, PurposeOfUse purposeOfUse) {
        Integer calorieOffset = (purposeOfUse == PurposeOfUse.DIET) ? -500 : 500;
        return  (int) (Math.floor(rmr / 100) * 100) + calorieOffset;
    }

    private Integer calculateRecommendedCarbohydrates(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (int)(recommendedCalories*0.5)/4;
        else if(dietMode == DietMode.FITNESS)
            return (int)(recommendedCalories*0.4)/4;
        else if(dietMode == DietMode.KETOGENIC)
            return (int)(recommendedCalories*0.08)/4;
        return 0;
    }

    private Integer calculateRecommendedProteins(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (int)(recommendedCalories*0.3)/4;
        else if(dietMode == DietMode.FITNESS)
            return (int)(recommendedCalories*0.4)/4;
        else if(dietMode == DietMode.KETOGENIC)
            return (int)(recommendedCalories*0.22)/4;
        return 0;
    }

    private Integer calculateRecommendedFats(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (int)(recommendedCalories*0.2)/9;
        else if(dietMode == DietMode.FITNESS)
            return (int)(recommendedCalories*0.2)/9;
        else if (dietMode == DietMode.KETOGENIC)
            return (int)(recommendedCalories*0.7)/9;
        return 0;
    }
    @Builder
    public Profiles (String nickname,Double targetWeight,Integer age,Gender gender,Double height,
                     Double weight,ActivityLevel activityLevel,PurposeOfUse purposeOfUse,
                     DietMode dietMode
    ){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.currentWeight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.dietMode = dietMode;
    }
    //==프로필 수정 메서드==//
    public void updateProfiles(Profiles profiles){
        this.targetWeight = profiles.getTargetWeight();
        this.age = profiles.getAge();
        this.gender = profiles.getGender();
        this.height = profiles.getHeight();
        this.weight = profiles.getWeight();
        this.activityLevel = profiles.getActivityLevel();
        this.purposeOfUse = profiles.getPurposeOfUse();
    }
    //==연관 관계 편의 메서드==//
    public void setUsers(Users users) {
        this.users = users;
        users.setProfiles(this);
    }
    // 다이어트 모드 업데이트
    public void setDietMode(DietMode dietMode) {
        this.dietMode = dietMode;
        this.recommendedCalories = calculateRecommendedCalories(calculateRMR(calculateBMR(this.weight,this.height,this.age,this.gender),
                this.activityLevel),this.purposeOfUse);
        this.recommendedCarbohydrates = calculateRecommendedCarbohydrates(dietMode);
        this.recommendedProteins = calculateRecommendedProteins(dietMode);
        this.recommendedFats = calculateRecommendedFats(dietMode);
    }
    // 현재 체중 업데이트
    public void updateCurrentWeight(Double weight) {
        this.currentWeight = weight;
    }
}

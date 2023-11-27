package edu.hongikuniversity.graduation.project.kalculator.domain;

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
    private double targetWeight;
    private double recommendedCalories;
    private double recommendedCarbohydrates;
    private double recommendedProteins;
    private double recommendedFats;
    private int age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private double height;
    private double weight;
    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;
    @Enumerated(EnumType.STRING)
    private PurposeOfUse purposeOfUse;
    @Enumerated(EnumType.STRING)
    private DietMode dietMode;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    private double calculateBMR(double weight,double height,int age,Gender gender) {
        double bmr = 0.0;
        if(gender==Gender.MALE){
            bmr = (9.99*weight)+(6.25*height) - (4.95*age)+5;
        }
        else{
            bmr = (9.99*weight)+(6.25*height) - (4.95*age)+161;
        }
        return bmr;
    }
    private double calculateRMR(double bmr,ActivityLevel activityLevel){
        double rmr = 0.0;
        if(activityLevel==ActivityLevel.LOW_ACTIVITY)
            rmr = bmr*1.5;
        else if(activityLevel==ActivityLevel.GENERAL_ACTIVITY)
            rmr = bmr*1.7;
        else
            rmr = bmr*1.9;
        return rmr;
    }
    private double calculateRecommendedCalories(double rmr, PurposeOfUse purposeOfUse) {
        double calorieOffset = (purposeOfUse == PurposeOfUse.DIET) ? -500 : 500;
        return rmr + calorieOffset;
    }

    private double calculateRecommendedCarbohydrates(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (recommendedCalories*0.5)/4;
        else if(dietMode == DietMode.FITNESS)
            return (recommendedCalories*0.4)/4;
        else if(dietMode == DietMode.KETOGENIC)
            return (recommendedCalories*0.08)/4;
        return 0.0;
    }

    private double calculateRecommendedProteins(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (recommendedCalories*0.3)/4;
        else if(dietMode == DietMode.FITNESS)
            return (recommendedCalories*0.4)/4;
        else if(dietMode == DietMode.KETOGENIC)
            return (recommendedCalories*0.22)/4;
        return 0.0;
    }

    private double calculateRecommendedFats(DietMode dietMode) {
        if(dietMode == DietMode.GENERAL)
            return (recommendedCalories*0.2)/9;
        else if(dietMode == DietMode.FITNESS)
            return (recommendedCalories*0.2)/9;
        else if (dietMode == DietMode.KETOGENIC)
            return (recommendedCalories*0.7)/9;
        return 0.0;
    }
    @Builder
    public Profiles (String nickname,double targetWeight,int age,Gender gender,double height,
                     double weight,ActivityLevel activityLevel,PurposeOfUse purposeOfUse,
                     DietMode dietMode,Users users
    ){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.dietMode = dietMode;
        this.recommendedCalories = calculateRecommendedCalories(calculateRMR(calculateBMR(weight,height,age,gender),activityLevel),purposeOfUse);
        this.recommendedCarbohydrates = calculateRecommendedCarbohydrates(dietMode);
        this.recommendedProteins = calculateRecommendedProteins(dietMode);
        this.recommendedFats = calculateRecommendedFats(dietMode);
        this.users = users;
    }
    //==프로필 수정 메서드==//
    public void updateProfiles(double targetWeight,int age,Gender gender,double height,
                               double weight,ActivityLevel activityLevel,PurposeOfUse purposeOfUse
    ,DietMode dietMode){
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.dietMode =dietMode;
        this.recommendedCalories = calculateRecommendedCalories(calculateRMR(calculateBMR(weight,height,age,gender),activityLevel),purposeOfUse);
        this.recommendedCarbohydrates = calculateRecommendedCarbohydrates(dietMode);
        this.recommendedProteins = calculateRecommendedProteins(dietMode);
        this.recommendedFats = calculateRecommendedFats(dietMode);
    }

}

package edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;

    private double targetWeight;

    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private double height;

    private double weight;

    private double currentWeight;

    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    private PurposeOfUse purposeOfUse;

    @Enumerated(EnumType.STRING)
    private DietMode dietMode;

    private int recommendedCalories;

    private int recommendedCarbohydrates;

    private int recommendedProteins;

    private int recommendedFats;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private Profile(String nickname, double targetWeight, int age, Gender gender, double height,
                    double weight, ActivityLevel activityLevel, PurposeOfUse purposeOfUse,
                    DietMode dietMode, User user) {
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
        this.user = user;
        calculateAndSetNutritionalValues();
        user.assignProfile(this);
    }

    private double calculateBMR() {
        return gender == Gender.MALE
                ? (9.99 * weight) + (6.25 * height) - (4.95 * age) + 5
                : (9.99 * weight) + (6.25 * height) - (4.95 * age) - 161;
    }

    private double calculateRMR(double bmr) {
        double activityMultiplier = switch (activityLevel) {
            case LOW_ACTIVITY -> 1.5;
            case GENERAL_ACTIVITY -> 1.7;
            case HIGH_ACTIVITY -> 1.9;
        };
        return bmr * activityMultiplier;
    }

    private int calculateRecommendedCalories(double rmr) {
        int offset = (purposeOfUse == PurposeOfUse.DIET) ? -500 : 500;
        return ((int) Math.floor(rmr / 100) * 100) + offset;
    }

    private void calculateAndSetNutritionalValues() {
        double bmr = calculateBMR();
        double rmr = calculateRMR(bmr);
        this.recommendedCalories = calculateRecommendedCalories(rmr);

        double[] macronutrientRatios = switch (dietMode) {
            case GENERAL -> new double[]{0.5, 0.3, 0.2};
            case FITNESS -> new double[]{0.4, 0.4, 0.2};
            case KETOGENIC -> new double[]{0.08, 0.22, 0.7};
        };

        this.recommendedCarbohydrates = (int) (recommendedCalories * macronutrientRatios[0] / 4);
        this.recommendedProteins = (int) (recommendedCalories * macronutrientRatios[1] / 4);
        this.recommendedFats = (int) (recommendedCalories * macronutrientRatios[2] / 9);
    }


    public void updateProfile(Profile profile) {
        this.targetWeight = profile.getTargetWeight();
        this.age = profile.getAge();
        this.gender = profile.getGender();
        this.height = profile.getHeight();
        this.weight = profile.getWeight();
        this.activityLevel = profile.getActivityLevel();
        this.purposeOfUse = profile.getPurposeOfUse();
    }


    public void updateCurrentWeight(double weight) {
        this.currentWeight = weight;
    }
}

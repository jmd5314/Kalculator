package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Profiles {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    private Double targetWeight;
    private Double recommendedCalories;
    private Double recommendedCarbohydrates;
    private Double recommendedProteins;
    private Double recommendedFats;
    private int age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Double weight;
    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;
    @Enumerated(EnumType.STRING)
    private PurposeOfUse purposeOfUse;
    @Enumerated(EnumType.STRING)
    private DietMode dietMode;

}

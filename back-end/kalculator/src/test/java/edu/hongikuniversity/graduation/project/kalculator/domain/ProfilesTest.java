package edu.hongikuniversity.graduation.project.kalculator.domain;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
@ExtendWith(SpringExtension.class)
@SpringBootTest
class ProfilesTest {
    @Test
    public void 프로필생성(){
        double targetWeight = 60.0;
        int age = 26;
        Gender gender = Gender.MALE;
        double height = 170.5;
        double weight = 68.5;
        ActivityLevel activityLevel = ActivityLevel.GENERAL_ACTIVITY;
        PurposeOfUse purposeOfUse = PurposeOfUse.DIET;
        DietMode dietMode = DietMode.FITNESS;
        Users users = Users.builder().build();
        Profiles profiles = Profiles.builder()
                .targetWeight(targetWeight)
                .age(age)
                .gender(gender)
                .weight(weight)
                .height(height)
                .activityLevel(activityLevel)
                .dietMode(dietMode)
                .purposeOfUse(purposeOfUse)
                .users(users)
                .build();
        System.out.println(profiles.getProfileId());
        System.out.println(profiles.getRecommendedCalories());
        System.out.println(profiles.getRecommendedCarbohydrates());
        System.out.println(profiles.getRecommendedProteins());
        System.out.println(profiles.getRecommendedFats());
        Assertions.assertThat(profiles.getAge()).isEqualTo(age);
    }
}
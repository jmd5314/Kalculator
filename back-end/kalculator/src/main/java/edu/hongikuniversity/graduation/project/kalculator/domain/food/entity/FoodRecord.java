package edu.hongikuniversity.graduation.project.kalculator.domain.food.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoodRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    private String name;

    private double calories;

    private double carbohydrates;

    private double proteins;

    private double fats;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private FoodRecord(
            MealType mealType,
            String name, double calories,
            double carbohydrates,
            double proteins,
            double fats,
            int quantity,
            User user
    ) {
        this.date = LocalDate.now();
        this.mealType = mealType;
        this.name = name;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.fats = fats;
        this.quantity = quantity;
        this.user = user;
    }
}

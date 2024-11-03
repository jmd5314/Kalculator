package edu.hongikuniversity.graduation.project.kalculator.domain.food.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
public class Food {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;
    @Enumerated(EnumType.STRING)
    private MealType mealType;
    private String foodName;
    private double calories;
    private double carbohydrates;
    private double proteins;
    private double fats;
    private double quantity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="recordId")
    private FoodRecord foodRecords;
    @Builder
    public Food(MealType mealType, String foodName, double calories, double carbohydrates, double proteins, double fats, double quantity){
        this.mealType = mealType;
        this.foodName = foodName;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.fats = fats;
        this.quantity = quantity;
    }
    public void setFoodRecords(FoodRecord foodRecords){
        this.foodRecords = foodRecords;
    }
}

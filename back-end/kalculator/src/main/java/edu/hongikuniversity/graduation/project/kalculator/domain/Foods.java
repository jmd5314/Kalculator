package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
public class Foods {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;
    private MealType mealType;
    private String foodName;
    private double calories;
    private double carbohydrates;
    private double proteins;
    private double fats;
    private double quantity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="recordId")
    private FoodRecords foodRecords;
    @Builder
    public Foods(MealType mealType,String foodName,double calories,double carbohydrates,double proteins,double fats,double quantity){
        this.mealType = mealType;
        this.foodName = foodName;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.fats = fats;
        this.quantity = quantity;
    }
    public void setFoodRecords(FoodRecords foodRecords){
        this.foodRecords = foodRecords;
    }
}

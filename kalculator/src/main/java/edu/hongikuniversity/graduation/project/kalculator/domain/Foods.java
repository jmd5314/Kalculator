package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;


@Entity
@Getter
public class Foods {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;
    private String foodName;
    private double calories;
    private double carbohydrates;
    private double proteins;
    private double fats;
    private double quantity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="recordId")
    private FoodRecords foodRecords;
}

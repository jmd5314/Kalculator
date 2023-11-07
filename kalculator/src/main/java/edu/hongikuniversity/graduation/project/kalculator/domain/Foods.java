package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;


@Entity
@Getter
public class Foods {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;
    private String foodName;
    private Double calories;
    private Double carbohydrates;
    private Double proteins;
    private Double fats;
    private Double quantity;
}

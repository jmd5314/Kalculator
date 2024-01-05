package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class FoodRecords {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;
    private LocalDate date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @OneToMany(mappedBy = "foodRecords")
    private List<Foods> foods = new ArrayList<>();
    @Builder
    public FoodRecords(LocalDate date){
        this.date = date;
    }
    //==연관관계 편의 메서드==//
    public void setUsers(Users users){
        this.users = users;
        users.getFoodRecords().add(this);
    }
    public void addFoods(List<Foods> foodList){
        for(Foods food:foodList) {
            foods.add(food);
            food.setFoodRecords(this);
        }
    }
}

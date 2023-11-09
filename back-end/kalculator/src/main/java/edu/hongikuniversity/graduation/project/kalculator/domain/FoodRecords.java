package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class FoodRecords {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;
    private LocalDate date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @OneToMany(mappedBy = "foodRecords")
    private List<Foods> foods = new ArrayList<>();
}

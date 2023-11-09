package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class RunningRecords {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;
    private double runningTime;
    private double distance;
    private double caloriesBurned;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;

}

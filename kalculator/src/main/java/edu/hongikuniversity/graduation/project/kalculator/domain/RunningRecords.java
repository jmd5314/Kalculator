package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class RunningRecords {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;
    private Double runningTime;
    private Double distance;
    private Double caloriesBurned;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;

}

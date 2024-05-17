package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class WeightLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;
    private LocalDate date;
    private Double weight;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @Builder
    public WeightLog(LocalDate date,Double weight){
        this.date = date;
        this.weight = weight;
    }
    public void setUsers(Users users){
        this.users = users;
        users.getWeightLogs().add(this);
    }
}

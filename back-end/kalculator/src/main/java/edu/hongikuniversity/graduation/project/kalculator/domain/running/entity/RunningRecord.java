package edu.hongikuniversity.graduation.project.kalculator.domain.running.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class RunningRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;
    private LocalDate date;
    private Double time;
    private Double distance;
    private Double caloriesBurned;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User users;
    @Builder
    public RunningRecord(LocalDate date, Double time, Double distance){
        this.date = date;
        this.time = time;
        this.distance = distance;
    }
    public void setCaloriesBurned(Double weight){
        // 속도 계산 (km/h)
        Double speed = (distance / time);
        // MET 계산
        Double MET = getMETBasedOnSpeed(speed);
        //소모 칼로리 계산 Calories = MET * weight(kg)*time(h)
        this.caloriesBurned = MET * weight * time;

    }
    public void setUsers(Users users){
        this.users = users;
        users.getRunningRecords().add(this);
    }
    private Double getMETBasedOnSpeed(Double speed) {
        if (speed < 8) {
            return 6.0;  // 조깅
        } else if (speed < 12) {
            return 8.3;  // 느린 달리기
        } else if (speed < 16) {
            return 11.0;  // 보통 속도 달리기
        } else {
            return 16.0;  // 빠른 달리기
        }
}
}

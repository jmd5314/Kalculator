package edu.hongikuniversity.graduation.project.kalculator.domain.running.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RunningRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private double time;

    private double distance;

    private double caloriesBurned;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private RunningRecord(User user, double time, double distance,double weight) {
        this.user = user;
        this.date = LocalDate.now();
        this.time = time;
        this.distance = distance;
        calculateCaloriesBurned(weight);
        user.addRunningRecord(this);
    }

    public void calculateCaloriesBurned(double weight) {
        // 속도 계산 (km/h)
        double speed = (distance / time);

        // MET 계산
        double met = getMetBasedOnSpeed(speed);

        //소모 칼로리 계산 Calories = MET * weight(kg)*time(h)
        this.caloriesBurned = met * weight * time;

    }


    private double getMetBasedOnSpeed(double speed) {
        if (speed < 8) {
            return 6.0;  // 조깅
        }
        if (speed < 12) {
            return 8.3;  // 느린 달리기
        }
        if (speed < 16) {
            return 11.0;  // 보통 속도 달리기
        }
        return 16.0;  // 빠른 달리기

    }
}

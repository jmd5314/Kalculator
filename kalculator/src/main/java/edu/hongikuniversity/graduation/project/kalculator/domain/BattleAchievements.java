package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class BattleAchievements {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievementId;
    private LocalDate date;
    private int points;
}

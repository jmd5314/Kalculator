package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class BattleAchievements {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievementId;
    private LocalDate date;
    private int points;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participantId")
    private BattleParticipants battleParticipants;
}

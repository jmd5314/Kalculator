package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class BattleParticipants {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;
    private LocalDate applicationTime;

}

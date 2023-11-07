package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class BattleGroups {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    private BattlePurpose battlePurpose;
    private LocalDate battleStart;
    private LocalDate battleEnd;
    private int numberOfParticipants;

}

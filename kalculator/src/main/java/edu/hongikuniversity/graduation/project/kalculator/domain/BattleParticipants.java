package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class BattleParticipants {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;
    private LocalDate applicationTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groupId")
    private BattleGroups battleGroups;
    @OneToMany(mappedBy = "battleParticipants")
    private List<BattleAchievements> battleAchievements = new ArrayList<>();
    @OneToMany(mappedBy = "battleParticipants")
    private List<UserBattleParticipant>userBattleParticipants = new ArrayList<>();

}

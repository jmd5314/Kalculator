package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class UserBattleParticipant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userBattleParticipantId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participantId")
    private BattleParticipants battleParticipants;
}

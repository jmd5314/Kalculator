package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.apache.catalina.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class BattleGroups {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    private BattlePurpose battlePurpose;
    private LocalDate battleStart;
    private LocalDate battleEnd;
    private int numberOfParticipants;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @OneToMany(mappedBy = "battleGroups")
    private List<BattleParticipants> battleParticipants = new ArrayList<>();
}

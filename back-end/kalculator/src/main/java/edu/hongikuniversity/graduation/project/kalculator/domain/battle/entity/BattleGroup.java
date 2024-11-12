package edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception.BattleGroupFullException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BattleGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String title;

    private String content;

    private double target;

    @Enumerated(EnumType.STRING)
    private BattlePurpose battlePurpose;

    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private BattleStatus status;

    private int memberCount;

    private int maxMemberCount;

    @OneToMany(mappedBy = "group")
    private List<GroupMembership> memberships = new ArrayList<>();

    @Builder
    private BattleGroup(
            String name,
            String title,
            String content,
            double target,
            BattlePurpose battlePurpose,
            LocalDate startDate,
            LocalDate endDate,
            BattleStatus status,
            int maxMemberCount) {
        this.name = name;
        this.title = title;
        this.content = content;
        this.target = target;
        this.battlePurpose = battlePurpose;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.memberCount = 1;
        this.maxMemberCount = maxMemberCount;
    }

    public void addGroupMemberShip(GroupMembership groupMembership) {
        if(memberCount>=maxMemberCount){
            throw new BattleGroupFullException();
        }
        this.memberships.add(groupMembership);
        increaseMemberCount();
    }

    public void increaseMemberCount(){
        this.memberCount++;
    }

}

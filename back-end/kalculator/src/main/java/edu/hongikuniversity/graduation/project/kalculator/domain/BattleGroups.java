package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
public class BattleGroups {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    private String leaderId;
    private String title;
    private String content;
    private BattlePurpose battlePurpose;
    private LocalDate startDate;
    private LocalDate endDate;
    private BattleStatus status;
    private Integer numberOfMembers;

    @OneToMany(mappedBy = "group")
    private Set<GroupMembership> memberships = new HashSet<>();
    @Builder
    public BattleGroups(String leaderId,String title,String content,BattlePurpose battlePurpose,LocalDate startDate,LocalDate endDate,BattleStatus status,Integer numberOfMembers){
        this.leaderId = leaderId;
        this.title = title;
        this.content = content;
        this.battlePurpose = battlePurpose;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.numberOfMembers = numberOfMembers;
    }

    public void setStatus(BattleStatus status) {
        this.status = status;
    }
}

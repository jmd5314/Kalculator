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
    private String leaderNickname;
    private String groupName;
    private String title;
    private String content;
    private Double target;
    @Enumerated(EnumType.STRING)
    private BattlePurpose battlePurpose;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private BattleStatus status;
    private Integer numberOfMembers;

    @OneToMany(mappedBy = "group")
    private List<GroupMembership> memberships = new ArrayList<>();
    @Builder
    public BattleGroups(String leaderId,String leaderNickname,String groupName,String title,String content,Double target,BattlePurpose battlePurpose,LocalDate startDate,LocalDate endDate,BattleStatus status,Integer numberOfMembers){
        this.leaderId = leaderId;
        this.leaderNickname = leaderNickname;
        this.groupName = groupName;
        this.title = title;
        this.content = content;
        this.target = target;
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

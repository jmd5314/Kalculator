package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattlePurpose;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattleStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BattleGroupsResponseDto {
    private Long groupId;
    private String leaderId;
    private String leaderNickname;
    private String groupName;
    private String title;
    private String content;
    private BattlePurpose battlePurpose;
    private BattleStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer currentMembers;
    private Integer numberOfMembers;
    private Double target;
    public BattleGroupsResponseDto(BattleGroups entity){
        this.groupId = entity.getGroupId();
        this.groupName = entity.getGroupName();
        this.leaderId = entity.getLeaderId();
        this.leaderNickname = entity.getLeaderNickname();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.battlePurpose = entity.getBattlePurpose();
        this.status = entity.getStatus();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.currentMembers = entity.getMemberships().size();
        this.numberOfMembers = entity.getNumberOfMembers();
        this.target = entity.getTarget();
    }
}

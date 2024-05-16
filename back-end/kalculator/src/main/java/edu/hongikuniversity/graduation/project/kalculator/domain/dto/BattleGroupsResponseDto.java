package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattlePurpose;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattleStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BattleGroupsResponseDto {
    Long groupId;
    String leaderId;
    String title;
    String content;
    BattlePurpose battlePurpose;
    BattleStatus status;
    LocalDate startDate;
    LocalDate endDate;
    Integer currentMembers;
    Integer numberOfMembers;
    public BattleGroupsResponseDto(BattleGroups entity){
        this.groupId = entity.getGroupId();
        this.leaderId = entity.getLeaderId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.battlePurpose = entity.getBattlePurpose();
        this.status = entity.getStatus();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.currentMembers = entity.getMemberships().size();
        this.numberOfMembers = entity.getNumberOfMembers();
    }
}

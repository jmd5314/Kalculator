package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattlePurpose;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BattleGroupsResponseDto {
    Long groupId;
    String leaderId;
    String title;
    String content;
    BattlePurpose battlePurpose;
    LocalDate startDate;
    LocalDate endDate;
    public BattleGroupsResponseDto(BattleGroups entity){
        this.groupId = entity.getGroupId();
        this.leaderId = entity.getLeaderId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.battlePurpose = entity.getBattlePurpose();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
    }
}

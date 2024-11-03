package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BattleGroupsRequestDto {
    private String groupName;
    private String title;
    private String content;
    private String battlePurpose;
    private LocalDate endDate;
    private Integer numberOfMembers;
    private Double target;
}

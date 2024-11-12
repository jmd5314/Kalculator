package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattlePurpose;

import java.time.LocalDate;

public record BattleGroupBriefResponse(
        Long id,
        String name,
        String title,
        BattlePurpose battlePurpose,
        LocalDate startDate,
        LocalDate endDate,
        int memberCount,
        int maxMemberCount

) {
    public static BattleGroupBriefResponse from(BattleGroup battleGroup){
        return new BattleGroupBriefResponse(
                battleGroup.getId(),
                battleGroup.getName(),
                battleGroup.getTitle(),
                battleGroup.getBattlePurpose(),
                battleGroup.getStartDate(),
                battleGroup.getEndDate(),
                battleGroup.getMemberCount(),
                battleGroup.getMaxMemberCount()
        );
    }

}

package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattlePurpose;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleStatus;

import java.time.LocalDate;

public record BattleGroupDetailsResponse(
        Long id,
        String name,
        String title,
        String content,
        BattlePurpose battlePurpose,
        BattleStatus battleStatus,
        LocalDate startDate,
        LocalDate endDate,
        int memberCount,
        int maxMemberCount,
        double target
) {
    public static BattleGroupDetailsResponse from(BattleGroup battleGroup) {
        return new BattleGroupDetailsResponse(
                battleGroup.getId(),
                battleGroup.getName(),
                battleGroup.getTitle(),
                battleGroup.getContent(),
                battleGroup.getBattlePurpose(),
                battleGroup.getStatus(),
                battleGroup.getStartDate(),
                battleGroup.getEndDate(),
                battleGroup.getMemberCount(),
                battleGroup.getMaxMemberCount(),
                battleGroup.getTarget()
        );
    }
}

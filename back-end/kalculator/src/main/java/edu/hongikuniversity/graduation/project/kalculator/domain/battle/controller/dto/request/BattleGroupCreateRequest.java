package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request;

import java.time.LocalDate;

public record BattleGroupCreateRequest(
        String name,
        String title,
        String content,
        String battlePurpose,
        LocalDate endDate,
        int numberOfMembers,
        double target

) {
}

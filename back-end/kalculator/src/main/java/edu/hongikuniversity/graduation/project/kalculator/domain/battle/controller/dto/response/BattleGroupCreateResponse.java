package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;

public record BattleGroupCreateResponse(
        Long groupId,
        Long membershipId
) {
    public static BattleGroupCreateResponse from(BattleGroup battleGroup, GroupMembership groupMembership) {
        return new BattleGroupCreateResponse(battleGroup.getId(), groupMembership.getId());
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;

public record BattleGroupJoinResponse(Long membershipId) {

    public static BattleGroupJoinResponse from(GroupMembership groupMembership) {
        return new BattleGroupJoinResponse(groupMembership.getId());
    }

}

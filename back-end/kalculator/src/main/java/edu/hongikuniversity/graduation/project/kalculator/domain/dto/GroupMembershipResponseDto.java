package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.Role;
import lombok.Getter;

@Getter
public class GroupMembershipResponseDto {
    private String userId;
    private String nickname;
    private Double score;
    public GroupMembershipResponseDto(GroupMembership entity){
        this.userId = entity.getUsers().getUserId();
        this.nickname = entity.getUsers().getProfiles().getNickname();
        this.score = entity.getScore();
    }
}


package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;

public record UserIdResponse(Long id) {
    public static UserIdResponse from(User user){
        return new UserIdResponse(user.getId());
    }
}

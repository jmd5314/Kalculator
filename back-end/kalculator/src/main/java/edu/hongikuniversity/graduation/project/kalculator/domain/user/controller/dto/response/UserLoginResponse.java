package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;

public record UserLoginResponse(boolean profileCreated, String username) {
    public static UserLoginResponse from(User user) {
        return new UserLoginResponse(user.checkProfileCreated(), user.getUsername());
    }
}

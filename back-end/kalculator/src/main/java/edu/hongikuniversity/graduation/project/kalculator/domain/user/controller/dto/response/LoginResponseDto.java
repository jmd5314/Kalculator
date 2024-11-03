package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response;

import lombok.Getter;

@Getter
public class LoginResponseDto {
    private String token;
    private boolean profileCreated;

    public LoginResponseDto(String token,boolean profileCreated){
        this.token = token;
        this.profileCreated = profileCreated;
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import lombok.Builder;
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

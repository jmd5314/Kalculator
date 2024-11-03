package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLoginRequestDto {
    private String userId;
    private String password;
}

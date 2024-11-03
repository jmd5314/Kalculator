package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserJoinRequestDto {
    private String userId;
    private String name;
    private String password;
    private String email;

}

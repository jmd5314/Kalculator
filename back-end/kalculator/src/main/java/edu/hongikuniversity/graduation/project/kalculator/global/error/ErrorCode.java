package edu.hongikuniversity.graduation.project.kalculator.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT, "username : '%s' 가 이미 존재합니다."),
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "email : '%s 가 이미 존재합니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND,"토큰이 존재 하지 않습니다"),
    TOKEN_NOT_VALID(HttpStatus.FORBIDDEN, "토큰이 유효하지 않습니다"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다"),
    PROFILE_NOT_FOUND(HttpStatus.NOT_FOUND, "프로필이 존재하지 않습니다"),;
    private final HttpStatus httpStatus;
    private final String messageTemplate;
}

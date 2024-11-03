package edu.hongikuniversity.graduation.project.kalculator.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@Getter
public enum ErrorCode {
    USERID_DUPLICATED(HttpStatus.CONFLICT,""),
    USER_EMAIL_DUPLICATED(HttpStatus.CONFLICT,""),
    USERID_NOT_FOUND(HttpStatus.NOT_FOUND,""),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "");
    private HttpStatus httpStatus;
    private String message;
}

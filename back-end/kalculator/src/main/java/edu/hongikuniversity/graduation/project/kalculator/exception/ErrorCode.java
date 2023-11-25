package edu.hongikuniversity.graduation.project.kalculator.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@Getter
public enum ErrorCode {
    USERID_DUPLICATED(HttpStatus.CONFLICT,""),
    EMAIL_DUPLICATED(HttpStatus.CONFLICT,"");
    private HttpStatus httpStatus;
    private String message;
}

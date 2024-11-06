package edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class TokenNotValidException extends AppException {
    public TokenNotValidException() {
        super(ErrorCode.TOKEN_NOT_VALID);

    }
}

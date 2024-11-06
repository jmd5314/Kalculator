package edu.hongikuniversity.graduation.project.kalculator.domain.user.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class UsernameDuplicateException extends AppException {
    public UsernameDuplicateException(String username) {
        super(ErrorCode.USERNAME_DUPLICATED, username);
    }
}

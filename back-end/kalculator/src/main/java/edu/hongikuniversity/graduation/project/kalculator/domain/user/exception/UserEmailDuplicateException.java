package edu.hongikuniversity.graduation.project.kalculator.domain.user.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class UserEmailDuplicateException extends AppException {
  public UserEmailDuplicateException(String email) {
    super(ErrorCode.EMAIL_DUPLICATED, email);
  }
}

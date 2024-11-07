package edu.hongikuniversity.graduation.project.kalculator.domain.heart.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class HeartExistException extends AppException {
    public HeartExistException(Long id) {
        super(ErrorCode.HEART_ALREADY_EXIST, id);
    }
}

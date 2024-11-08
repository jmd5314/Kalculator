package edu.hongikuniversity.graduation.project.kalculator.domain.post.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class PostNotFoundException extends AppException {
    public PostNotFoundException(Long id) {
        super(
                ErrorCode.POST_NOT_FOUND, id
        );
    }
}

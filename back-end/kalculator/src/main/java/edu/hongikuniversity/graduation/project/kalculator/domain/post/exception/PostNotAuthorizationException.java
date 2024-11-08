package edu.hongikuniversity.graduation.project.kalculator.domain.post.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class PostNotAuthorizationException extends AppException {
    public PostNotAuthorizationException(Long id) {
        super(ErrorCode.POST_NOT_AUTHORIZE, id);
    }
}

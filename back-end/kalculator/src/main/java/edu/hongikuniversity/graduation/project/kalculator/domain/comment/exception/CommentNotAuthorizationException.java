package edu.hongikuniversity.graduation.project.kalculator.domain.comment.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class CommentNotAuthorizationException extends AppException {
    public CommentNotAuthorizationException(Long id) {
        super(ErrorCode.COMMENT_NOT_AUTHORIZE);
    }
}

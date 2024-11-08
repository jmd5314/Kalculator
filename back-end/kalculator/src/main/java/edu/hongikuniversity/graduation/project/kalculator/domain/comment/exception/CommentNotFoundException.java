package edu.hongikuniversity.graduation.project.kalculator.domain.comment.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class CommentNotFoundException extends AppException {
    public CommentNotFoundException(Long id) {
        super(ErrorCode.COMMENT_NOT_FOUND,id);
    }
}

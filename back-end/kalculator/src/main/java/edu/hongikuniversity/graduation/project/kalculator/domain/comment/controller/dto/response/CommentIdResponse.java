package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;

public record CommentIdResponse(Long id) {
    public static CommentIdResponse from(Comment comment){
        return new CommentIdResponse(comment.getId());
    }
}

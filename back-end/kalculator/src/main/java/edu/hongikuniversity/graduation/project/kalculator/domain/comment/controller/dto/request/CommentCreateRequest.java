package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record CommentCreateRequest(
        Long postId,
        @NotEmpty(message = "댓글 내용이 비어있습니다")
        String content) {

}

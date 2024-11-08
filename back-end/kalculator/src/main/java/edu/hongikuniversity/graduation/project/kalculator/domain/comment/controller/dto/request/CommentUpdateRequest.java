package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CommentUpdateRequest(
        @NotNull
        Long id,
        @NotEmpty(message = "댓글 내용이 비어있습니다")
        String content
) {
}

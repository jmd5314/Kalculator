package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response;

import java.time.LocalDateTime;

public record CommentDetailsResponse(
        Long id,
        String username,
        String nickname,
        String content,
        LocalDateTime createdAt

                                     ) {
}

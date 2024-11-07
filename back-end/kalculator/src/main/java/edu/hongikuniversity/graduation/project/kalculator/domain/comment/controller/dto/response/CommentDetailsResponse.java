package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import java.time.LocalDateTime;

public record CommentDetailsResponse(
        Long id,
        String username,
        String nickname,
        String content,
        LocalDateTime createdAt

                                     ) {
    public static CommentDetailsResponse from(Comment comment) {
        return new CommentDetailsResponse(
                comment.getId(),
                comment.getUser().getUsername(),
                comment.getUser().getProfile().getNickname(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }

}

package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comments;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CommentResponseDto {
    private Long commentId;
    private String userId;
    private String nickname;
    private String content;
    private LocalDate creationDate;
    public CommentResponseDto(Comments entity){
        this.commentId = entity.getCommentId();
        this.userId = entity.getUsers().getUserId();
        this.nickname = entity.getUsers().getProfiles().getNickname();
        this.content = entity.getContent();
        this.creationDate = entity.getCreationDate();
    }
}

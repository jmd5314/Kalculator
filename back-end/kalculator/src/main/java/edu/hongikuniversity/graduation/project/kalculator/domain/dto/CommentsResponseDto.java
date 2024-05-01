package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CommentsResponseDto {
    private Long commentId;
    private String userId;
    private String content;
    private LocalDate creationDate;
    public CommentsResponseDto(Comments entity){
        this.commentId = entity.getCommentId();
        this.userId = entity.getUsers().getUserId();
        this.content = entity.getContent();
        this.creationDate = entity.getCreationDate();
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request;

import lombok.Getter;

@Getter
public class CommentSaveRequestDto {
    private Long postId;
    private String content;
}

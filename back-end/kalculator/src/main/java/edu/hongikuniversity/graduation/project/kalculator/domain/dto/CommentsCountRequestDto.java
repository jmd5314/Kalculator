package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

@Getter
public class CommentsCountRequestDto {
    private String userId;
    private Long postId;
}

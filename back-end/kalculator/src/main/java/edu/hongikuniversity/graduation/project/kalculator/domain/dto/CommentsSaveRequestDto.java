package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CommentsSaveRequestDto {
    private String userId;
    private Long postId;
    private String content;
    private LocalDate creationDate;
}

package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CommentsResponseDto {
    private String userId;
    private String content;
    private LocalDate creationDate;
}

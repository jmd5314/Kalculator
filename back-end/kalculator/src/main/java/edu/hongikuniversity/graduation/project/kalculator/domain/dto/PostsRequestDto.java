package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PostsRequestDto {
    private String title;
    private String content;
    private LocalDate creationDate;
}

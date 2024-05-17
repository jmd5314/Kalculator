package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PostsSaveRequestDto {
    private String title;
    private String content;
}

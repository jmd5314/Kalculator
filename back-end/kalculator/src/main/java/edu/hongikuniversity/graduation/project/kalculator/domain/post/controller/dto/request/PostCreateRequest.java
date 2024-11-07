package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record PostCreateRequest(
        @NotEmpty
        String title,
        @NotEmpty
        String content) {
}

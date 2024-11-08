package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PostUpdateRequest(
        @NotNull
        Long id,
        @NotEmpty
        String title,
        @NotEmpty
        String content) {
}

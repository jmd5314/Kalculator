package edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;

public record HeartIdResponse(Long id) {
    public static HeartIdResponse from(Heart heart) {
        return new HeartIdResponse(heart.getId());
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;

public record ProfileIdResponse(Long id) {
    public static ProfileIdResponse from(Profile profile){
        return new ProfileIdResponse(profile.getId());
    }
}

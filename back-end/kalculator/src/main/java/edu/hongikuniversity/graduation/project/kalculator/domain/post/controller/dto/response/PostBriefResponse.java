package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response;

public record PostBriefResponse(
        Long id,
        String nickname,
        String username,
        String title,
        int likeCount,
        int commentCount
) {

}

package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;

public record PostBriefResponse(
        Long id,
        String nickname,
        String username,
        String title,
        Long likeCount,
        Long commentCount
) {

    public static PostBriefResponse from(Post post) {
        return new PostBriefResponse(
                post.getId(),
                post.getUser().getProfile().getNickname(),
                post.getUser().getUsername(),
                post.getTitle(),
                post.getLikeCount(),
                post.getCommentCount()
        );
    }
}

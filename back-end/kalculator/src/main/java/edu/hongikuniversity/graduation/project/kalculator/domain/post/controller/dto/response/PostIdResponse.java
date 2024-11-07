package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;

public record PostIdResponse(Long id) {
    public static PostIdResponse from(Post post) {
        return new PostIdResponse(post.getId());
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response.CommentDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;

import java.util.ArrayList;
import java.util.List;

public record PostDetailsResponse(
        Long id,
        String title,
        String content,
        boolean isLiked,
        List<CommentDetailsResponse> commentDetailsResponses
) {
    public static PostDetailsResponse from(Post post) {
        return new PostDetailsResponse(
                post.getId(),
                post.getTitle(),
                post.getTitle(),
                //TODO
                true,
                new ArrayList<>()
        );
    }

}

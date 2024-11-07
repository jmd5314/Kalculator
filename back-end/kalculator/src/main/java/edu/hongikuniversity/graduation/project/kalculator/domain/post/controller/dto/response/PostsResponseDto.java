package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import lombok.Getter;

import java.time.LocalDate;
@Getter
public class PostsResponseDto {
    private Long postId;
    private String userId;
    private String nickname;
    private String title;
    private String content;
    private LocalDate creationDate;
    private Integer likeCount;
    private Integer commentCount;
    public PostsResponseDto(Post entity){
        this.postId = entity.getPostId();
        this.userId = entity.getUsers().getUserId();
        this.nickname = entity.getUsers().getProfiles().getNickname();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.creationDate = entity.getCreationDate();
        this.likeCount = entity.getHearts().size();
        this.commentCount = entity.getComments().size();
    }
}

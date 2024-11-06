package edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private String content;
    private LocalDate creationDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="postId")
    private Posts posts;
    @Builder
    public Comment(String content, Users users, Posts posts, LocalDate creationDate){
        this.users = users;
        this.posts = posts;
        this.content = content;
        this.creationDate = creationDate;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

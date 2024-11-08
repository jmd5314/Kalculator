package edu.hongikuniversity.graduation.project.kalculator.domain.post.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private LocalDate createdAt;

    private Long likeCount;

    private Long commentCount;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Heart> hearts = new ArrayList<>();

    @Builder
    private Post(String title, String content, LocalDate createdAt, User user) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.likeCount = 0L;
        this.commentCount = 0L;
        this.user = user;
        user.addPost(this);
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
        increaseCommentCount();
    }

    public void addHeart(Heart heart) {
        this.hearts.add(heart);
        increaseLikeCount();
    }

    public void increaseLikeCount(){
        this.likeCount++;
    }

    public void increaseCommentCount(){
        this.commentCount++;
    }

    public void decreaseLikeCount(){
        this.likeCount--;
    }

    public void decreaseCommentCount(){
        this.commentCount--;
    }

}

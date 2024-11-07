package edu.hongikuniversity.graduation.project.kalculator.domain.post.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Hearts;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String title;
    private String content;
    private LocalDate creationDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @OneToMany(mappedBy = "posts")
    private List<Comment> comments = new ArrayList<>();
    @OneToMany(mappedBy = "posts")
    private List<Hearts> hearts = new ArrayList<>();
    @Builder
    public Post(String title, String content, LocalDate creationDate){
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
    }
    //==연관 관계 편의 메서드==//
    public void setUsers(Users users){
        this.users = users;
        users.getPosts().add(this);
    }

    public void update(String title,String content) {
        this.title = title;
        this.content = content;
    }
}

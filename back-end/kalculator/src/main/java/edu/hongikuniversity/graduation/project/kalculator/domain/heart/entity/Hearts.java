package edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Hearts {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    private Posts posts;

    @Builder
    public Hearts(Users users, Posts posts) {
        this.users = users;
        this.posts = posts;
    }
}

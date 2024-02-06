package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
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

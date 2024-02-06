package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Posts {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String title;
    private String content;
    private LocalDate creationDate;
    @ColumnDefault("0")
    private Integer likeCount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @OneToMany(mappedBy = "posts")
    private List<Comments> comments = new ArrayList<>();
    @OneToMany(mappedBy = "posts")
    private List<Hearts> hearts = new ArrayList<>();
    @Builder
    public Posts(String title,String content,LocalDate creationDate){
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
    }
    //==연관 관계 편의 메서드==//
    public void setUsers(Users users){
        this.users = users;
        users.getPosts().add(this);
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.user.entity;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String name;

    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "users")
    private Profile profile;

    @OneToMany(mappedBy = "users")
    private List<FoodRecord> foodRecords = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<Posts> posts = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<RunningRecord> runningRecords = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<GroupMembership> memberships = new ArrayList<>();


    @Builder
    private User(String username, String name, String password, String email, Role role) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public void assignProfile(Profile profile) {
        this.profile = profile;
    }

    public void passwordEncode(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(this.password);
    }

    public boolean checkProfileCreated() {
        return this.profile != null;
    }

}

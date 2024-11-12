package edu.hongikuniversity.graduation.project.kalculator.domain.user.entity;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
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

    private String nickname;

    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    private double currentWeight;

    @OneToOne(mappedBy = "user")
    private Profile profile;

    @OneToMany(mappedBy = "user")
    private List<FoodRecord> foodRecords = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<RunningRecord> runningRecords = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<GroupMembership> memberships = new ArrayList<>();


    @Builder
    private User(String username, String name, String nickname, String password, String email, Role role) {
        this.username = username;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public void assignProfile(Profile profile) {
        this.profile = profile;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addPost(Post post){
        this.posts.add(post);
    }

    public void addHeart(Heart heart) {
        this.hearts.add(heart);
    }

    public void addFoodRecord(FoodRecord foodRecord) {
        this.foodRecords.add(foodRecord);
    }

    public void addRunningRecord(RunningRecord runningRecord) {
        this.runningRecords.add(runningRecord);
    }

    public void addGroupMemberShip(GroupMembership groupMembership) {
        this.memberships.add(groupMembership);
    }

    public void passwordEncode(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(this.password);
    }

    public boolean checkProfileCreated() {
        return this.profile != null;
    }

    public void updateCurrentWeight(double currentWeight){
        this.currentWeight = currentWeight;
    }
}

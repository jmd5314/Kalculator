package edu.hongikuniversity.graduation.project.kalculator.domain.user.entity;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy = "users",fetch = FetchType.LAZY)
    private Profiles profiles;
    @OneToMany(mappedBy = "users")
    private List<FoodRecord> foodRecords = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Comments> comments = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Posts> posts = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Hearts> hearts = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<RunningRecord> runningRecords = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<GroupMembership> memberships = new ArrayList<>();

    private String userId;
    private String name;
    private String password;
    private String email;

    @Builder
    public Users(String userId,String name,String password,String email){
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.email  = email;
    }

    public void setProfiles(Profiles profiles) {
        this.profiles = profiles;
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy = "users",fetch = FetchType.LAZY)
    private Profiles profiles;
    @OneToMany(mappedBy = "users")
    private List<FoodRecords> foodRecords = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Comments> comments = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Posts> posts = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<Hearts> hearts = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<RunningRecords> runningRecords = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private Set<GroupMembership> memberships = new HashSet<>();

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

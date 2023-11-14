package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
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
    private List<BattleGroups> battleGroups = new ArrayList<>();
    @OneToMany(mappedBy = "users")
    private List<UserBattleParticipant>userBattleParticipants = new ArrayList<>();
    private String username;
    private String password;
    private LocalDate dateOfBirth;
    @Builder
    public Users(String username,String password,LocalDate dateOfBirth){
        this.username = username;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }
}

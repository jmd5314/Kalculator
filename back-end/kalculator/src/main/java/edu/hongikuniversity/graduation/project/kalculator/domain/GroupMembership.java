package edu.hongikuniversity.graduation.project.kalculator.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

@Entity
@Getter
@NoArgsConstructor
public class GroupMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long membershipId;
    @ManyToOne
    @JoinColumn(name = "groupId")
    private BattleGroups group;
    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Double battlePoints;

    // 가입시 초기 몸무게
    private Double startWeight;
    @Builder
    public GroupMembership(Role role,Double battlePoints,Double startWeight){
        this.role = role;
        this.battlePoints = battlePoints;
        this.startWeight = startWeight;
    }
    //==연관관계 편의 메서드==//
    public void setUsers(Users users){
        this.users = users;
        users.getMemberships().add(this);
    }
    public void setGroup(BattleGroups group){
        this.group = group;
        group.getMemberships().add(this);
    }
}

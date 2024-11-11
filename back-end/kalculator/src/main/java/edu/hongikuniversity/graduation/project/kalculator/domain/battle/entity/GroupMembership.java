package edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private BattleGroup group;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private GroupRole role;

    // 가입시 초기 몸무게
    private double startWeight;

    private double score;

    @Builder
    private GroupMembership(User user, BattleGroup group, GroupRole role, double startWeight) {
        this.group = group;
        this.user = user;
        this.role = role;
        this.startWeight = startWeight;
        this.score = 0;
        user.addGroupMemberShip(this);
        group.addGroupMemberShip(this);
    }


    public void setGroup(BattleGroup group) {
        this.group = group;
        group.getMemberships().add(this);
    }

    public void updateScore(double score) {
        this.score = score;
    }
}

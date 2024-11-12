package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.QBattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.QBattleGroup.battleGroup;
import static edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.QGroupMembership.groupMembership;

@RequiredArgsConstructor
public class CustomBattleGroupRepositoryImpl implements CustomBattleGroupRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<BattleGroup> findByUser(User user) {
        return queryFactory.selectFrom(battleGroup)
                .join(battleGroup.memberships, groupMembership)
                .where(groupMembership.user.eq(user))
                .fetch();
    }
}

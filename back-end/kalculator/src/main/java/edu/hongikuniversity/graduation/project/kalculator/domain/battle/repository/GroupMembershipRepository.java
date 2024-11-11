package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership,Long> {
    Optional<GroupMembership> findByUserAndGroup(User user, BattleGroup group);

    List<GroupMembership> findByUser(User user);

    List<GroupMembership> findByGroup(BattleGroup group);
}

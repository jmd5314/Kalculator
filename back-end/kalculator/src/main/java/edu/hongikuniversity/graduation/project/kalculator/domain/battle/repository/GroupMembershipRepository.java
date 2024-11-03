package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership,Long> {
    Optional<GroupMembership> findByUsersAndGroup(Users user, BattleGroups group);

    List<GroupMembership> findByUsers(Users user);

    List<GroupMembership> findByGroup(BattleGroups group);
}

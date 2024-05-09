package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership,Long> {
    Optional<GroupMembership> findByUsersAndGroup(Users user, BattleGroups group);

    List<GroupMembership> findByUsers(Users user);

}

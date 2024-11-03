package edu.hongikuniversity.graduation.project.kalculator.domain.battle.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.GroupMembershipRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupMembershipService {
    private final GroupMembershipRepository groupMembershipRepository;

    @Transactional
    public Long save(GroupMembership groupMembership){
        return groupMembershipRepository.save(groupMembership).getMembershipId();
    }
    public boolean isMemberAlready(Users user, BattleGroup group){
        Optional<GroupMembership> membership = groupMembershipRepository.findByUsersAndGroup(user, group);
        return membership.isPresent();
    }

    public List<GroupMembership> findByUsers(Users user) {
        List<GroupMembership> membershipList = groupMembershipRepository.findByUsers(user);
        return membershipList;
    }

    public List<GroupMembership> findByGroup(BattleGroup group) {
        List<GroupMembership> membershipList = groupMembershipRepository.findByGroup(group);
        return membershipList;
    }
}

package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.repository.BattleGroupsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.GroupMembershipRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BattleGroupsService {
    private final BattleGroupsRepository battleGroupsRepository;
    private final GroupMembershipRepository groupMembershipRepository;
    private final UsersRepository usersRepository;
    @Transactional
    public Long save (BattleGroups battleGroups){
        return battleGroupsRepository.save(battleGroups).getGroupId();
    }
    public void joinGroup(Long groupId,Long userId){
        GroupMembership membership = new GroupMembership();
    }
}

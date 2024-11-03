package edu.hongikuniversity.graduation.project.kalculator.domain.battle.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleStatus;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.BattleGroupsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.GroupMembershipRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BattleGroupService {
    private final BattleGroupsRepository battleGroupsRepository;
    private final GroupMembershipRepository groupMembershipRepository;
    private final UsersRepository usersRepository;
    @Transactional
    public Long save (BattleGroup battleGroups){
        return battleGroupsRepository.save(battleGroups).getGroupId();
    }
    @Transactional
    public void updateGroupStatuses() {
        List<BattleGroup> allGroups = battleGroupsRepository.findAll();
        LocalDate today = LocalDate.now();
        for (BattleGroup group : allGroups) {
            if (group.getStatus() == BattleStatus.PROGRESS && !group.getEndDate().isAfter(today)) {
                group.setStatus(BattleStatus.COMPLETED);
            }
        }
        battleGroupsRepository.saveAll(allGroups);
    }
    public List<BattleGroup> findProgressingGroups() {
        return battleGroupsRepository.findByStatus(BattleStatus.PROGRESS);
    }
    public List<BattleGroup> findAll() {
        return battleGroupsRepository.findAll();
    }

    public BattleGroup findById(Long groupId) {
        return battleGroupsRepository.findById(groupId).orElseThrow(()->new IllegalArgumentException("해당 그룹을 찾을 수 없습니다."));
    }

}

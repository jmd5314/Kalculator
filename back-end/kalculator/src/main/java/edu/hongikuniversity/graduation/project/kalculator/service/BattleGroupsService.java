package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattleStatus;
import edu.hongikuniversity.graduation.project.kalculator.domain.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.repository.BattleGroupsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.GroupMembershipRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
    @Transactional
    public void updateGroupStatuses() {
        List<BattleGroups> allGroups = battleGroupsRepository.findAll();
        LocalDate today = LocalDate.now();
        for (BattleGroups group : allGroups) {
            if (group.getStatus() == BattleStatus.PROGRESS && !group.getEndDate().isAfter(today)) {
                group.setStatus(BattleStatus.COMPLETED);
            }
        }
        battleGroupsRepository.saveAll(allGroups);
    }
    public List<BattleGroups> findProgressingGroups() {
        return battleGroupsRepository.findByStatus(BattleStatus.PROGRESS);
    }
    public List<BattleGroups> findAll() {
        return battleGroupsRepository.findAll();
    }

    public BattleGroups findById(Long groupId) {
        return battleGroupsRepository.findById(groupId).orElseThrow(()->new IllegalArgumentException("해당 그룹을 찾을 수 없습니다."));
    }

}

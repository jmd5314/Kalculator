package edu.hongikuniversity.graduation.project.kalculator.domain.battle.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request.BattleGroupCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupCreateResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.*;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.BattleGroupRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.BattleGroupsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.GroupMembershipRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UserRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BattleGroupService {
    private final BattleGroupRepository battleGroupRepository;
    private final GroupMembershipRepository groupMembershipRepository;
    private final UserRepository userRepository;

    @Transactional
    public BattleGroupCreateResponse create(BattleGroupCreateRequest request) {
        BattleGroup battleGroup = BattleGroup.builder()
                .name(request.name())
                .title(request.title())
                .content(request.content())
                .battlePurpose(BattlePurpose.valueOf(request.battlePurpose()))
                .endDate(request.endDate())
                .numberOfMembers(request.numberOfMembers())
                .target(request.target())
                .build();

        GroupMembership groupMembership = GroupMembership.builder()
                .user(getCurrentUser())
                .role(GroupRole.LEADER)
                .startWeight(getCurrentUser().getCurrentWeight())
                .build();

        groupMembershipRepository.save(groupMembership);
        battleGroupRepository.save(battleGroup);

        return BattleGroupCreateResponse.from(battleGroup, groupMembership);
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
        return battleGroupsRepository.findById(groupId).orElseThrow(() -> new IllegalArgumentException("해당 그룹을 찾을 수 없습니다."));
    }

}

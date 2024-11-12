package edu.hongikuniversity.graduation.project.kalculator.domain.battle.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request.BattleGroupCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupBriefResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupCreateResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupJoinResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.*;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception.BattleGroupNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception.GroupMembershipExistException;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.BattleGroupRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository.GroupMembershipRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BattleGroupService {
    private final BattleGroupRepository battleGroupRepository;
    private final GroupMembershipRepository groupMembershipRepository;

    @Transactional
    public BattleGroupCreateResponse create(BattleGroupCreateRequest request) {
        BattleGroup battleGroup = BattleGroup.builder()
                .name(request.name())
                .title(request.title())
                .content(request.content())
                .battlePurpose(BattlePurpose.valueOf(request.battlePurpose()))
                .endDate(request.endDate())
                .maxMemberCount(request.maxMemberCount())
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

    public List<BattleGroupBriefResponse> getProgressList() {
        List<BattleGroup> battleGroups = battleGroupRepository.findByStatus(BattleStatus.PROGRESS);
        return battleGroups.stream()
                .map(BattleGroupBriefResponse::from)
                .toList();
    }

    public BattleGroupDetailsResponse getGroupDetails(Long id) {
        BattleGroup battleGroup = battleGroupRepository.findById(id)
                .orElseThrow(() -> new BattleGroupNotFoundException(id));
        return BattleGroupDetailsResponse.from(battleGroup);
    }

    @Transactional
    public BattleGroupJoinResponse join(Long id) {

        User user = getCurrentUser();

        BattleGroup battleGroup = battleGroupRepository.findById(id)
                .orElseThrow(() -> new BattleGroupNotFoundException(id));

        groupMembershipRepository.findByUserAndGroup(user, battleGroup)
                .ifPresent(membership -> {
                    throw new GroupMembershipExistException();

                });

        GroupMembership groupMembership = GroupMembership.builder()
                .user(user)
                .group(battleGroup)
                .role(GroupRole.MEMBER)
                .startWeight(user.getCurrentWeight())
                .build();

        groupMembershipRepository.save(groupMembership);

        return BattleGroupJoinResponse.from(groupMembership);

    }

    public List<BattleGroupBriefResponse> getMyGroups() {
        List<BattleGroup> battleGroups = battleGroupRepository.findByUser(getCurrentUser());
        return battleGroups.stream()
                .map(BattleGroupBriefResponse::from)
                .toList();

    }

//    @Transactional
//    public void updateGroupStatuses() {
//        List<BattleGroup> allGroups = battleGroupsRepository.findAll();
//        LocalDate today = LocalDate.now();
//        for (BattleGroup group : allGroups) {
//            if (group.getStatus() == BattleStatus.PROGRESS && !group.getEndDate().isAfter(today)) {
//                group.setStatus(BattleStatus.COMPLETED);
//            }
//        }
//        battleGroupsRepository.saveAll(allGroups);
//    }


}

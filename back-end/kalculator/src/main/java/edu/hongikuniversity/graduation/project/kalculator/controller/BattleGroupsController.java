package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.BattleGroupsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.BattleGroupsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/battleGroups")
public class BattleGroupsController {
    private final BattleGroupsService battleGroupsService;
    private final UsersService usersService;
    // 배틀 그룹 생성
    @PostMapping("/save")
    public ResponseEntity<Long> save(BattleGroupsRequestDto requestDto, Authentication authentication){
        BattleGroups group = BattleGroups.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .battlePurpose(BattlePurpose.valueOf(requestDto.getBattlePurpose().toUpperCase()))
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .status(BattleStatus.RECRUITING)
                .numberOfMembers(0)
                .build();
        String userId = authentication.getName();
        Users leader = usersService.findByUserId(userId);
        GroupMembership membership = GroupMembership.builder()
                .battlePoints(0.0)
                .role(Role.LEADER)
                .startWeight(leader.getProfiles().getWeight())
                .build();
        membership.setUsers(leader);
        membership.setGroup(group);
        return ResponseEntity.ok(battleGroupsService.save(group));
    }
}

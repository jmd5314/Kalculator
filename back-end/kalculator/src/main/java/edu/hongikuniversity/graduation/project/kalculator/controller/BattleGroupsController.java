package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.BattleGroupsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.BattleGroupsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.service.BattleGroupsService;
import edu.hongikuniversity.graduation.project.kalculator.service.GroupMembershipService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/battleGroups")
public class BattleGroupsController {
    private final BattleGroupsService battleGroupsService;
    private final GroupMembershipService groupMembershipService;
    private final UsersService usersService;
    // 배틀 그룹 생성
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody BattleGroupsRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Users leader = usersService.findByUserId(userId);
        BattleGroups group = BattleGroups.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .battlePurpose(BattlePurpose.valueOf(requestDto.getBattlePurpose().toUpperCase()))
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .status(BattleStatus.RECRUITING)
                .numberOfMembers(requestDto.getNumberOfMembers())
                .leaderId(userId)
                .build();
        GroupMembership membership = GroupMembership.builder()
                .role(Role.LEADER)
                .startWeight(leader.getProfiles().getWeight())
                .build();
        membership.setUsers(leader);
        membership.setGroup(group);
        battleGroupsService.save(group);
        return ResponseEntity.ok("그룹을 성공적으로 생성하였습니다.");
    }
    // 모집중인 그룹 조회
    @GetMapping("/list")
    @ResponseBody
    public List<BattleGroupsResponseDto> list (){
        List<BattleGroupsResponseDto> groupsResponseDtoList = new ArrayList<>();
        List<BattleGroups> groupList = battleGroupsService.findRecruitingGroups();
        for(BattleGroups group : groupList){
            groupsResponseDtoList.add(new BattleGroupsResponseDto(group));
        }
        return groupsResponseDtoList;
    }
    // 그룹 가입
    @PostMapping("/join/{groupId}")
    public ResponseEntity<String> join (@PathVariable Long groupId,Authentication authentication){
        BattleGroups group = battleGroupsService.findById(groupId);
        String userId = authentication.getName();
        Users user = usersService.findByUserId(userId);
        // 최대 인원수가 다 찼을 경우
        if(group.getNumberOfMembers()==group.getMemberships().size()){
            return ResponseEntity.badRequest().body("인원수가 다 찼습니다.");
        }
        //이미 가입된 유저인 경우
        if(groupMembershipService.isMemberAlready(user,group)){
            return ResponseEntity.badRequest().body("이미 가입된 유저입니다.");
        }
        GroupMembership membership = GroupMembership.builder()
                .role(Role.MEMBER)
                .startWeight(user.getProfiles().getWeight())
                .build();
        membership.setGroup(group);
        membership.setUsers(user);
        groupMembershipService.save(membership);
        return ResponseEntity.ok("그룹에 성공적으로 가입하였습니다.");
    }
    // 사용자가 가입한 그룹들 조회
    @GetMapping("/myGroups")
    @ResponseBody
    public List<BattleGroupsResponseDto> myGroups(Authentication authentication){
        String userId = authentication.getName();
        Users user = usersService.findByUserId(userId);
        List<GroupMembership> membershipList = groupMembershipService.findByUsers(user);
        List<BattleGroupsResponseDto> myGroupList = membershipList.stream()
                .map(GroupMembership::getGroup)
                .map(BattleGroupsResponseDto::new)
                .collect(Collectors.toList());
        return myGroupList;
    }
}

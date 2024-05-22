package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.BattleGroupsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.BattleGroupsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.GroupMembershipResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    private final RunningRecordsService runningRecordsService;
    @GetMapping("/today")
    @ResponseBody
    public LocalDate today(){
        return LocalDate.now();
    }
    // 배틀 그룹 생성
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody BattleGroupsRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Users leader = usersService.findByUserId(userId);
        BattleGroups group = BattleGroups.builder()
                .groupName(requestDto.getGroupName())
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .target(requestDto.getTarget())
                .battlePurpose(BattlePurpose.valueOf(requestDto.getBattlePurpose().toUpperCase()))
                .startDate(LocalDate.now())
                .endDate(requestDto.getEndDate())
                .status(BattleStatus.PROGRESS)
                .numberOfMembers(requestDto.getNumberOfMembers())
                .leaderId(userId)
                .leaderNickname(leader.getProfiles().getNickname())
                .build();

        GroupMembership membership = GroupMembership.builder()
                .role(Role.LEADER)
                .startWeight(leader.getProfiles().getCurrentWeight())
                .score(0.0)
                .build();
        membership.setUsers(leader);
        membership.setGroup(group);
        battleGroupsService.save(group);
        groupMembershipService.save(membership);
        return ResponseEntity.ok("그룹을 성공적으로 생성하였습니다.");
    }
    // 진행중인 그룹 조회
    @GetMapping("/list")
    @ResponseBody
    public List<BattleGroupsResponseDto> list (){
        List<BattleGroupsResponseDto> groupsResponseDtoList = new ArrayList<>();
        List<BattleGroups> groupsList = battleGroupsService.findProgressingGroups();
        for(BattleGroups group : groupsList) {
            groupsResponseDtoList.add(new BattleGroupsResponseDto(group));
        }
        return groupsResponseDtoList;
    }
    @GetMapping("/{groupId}")
    @ResponseBody
    public BattleGroupsResponseDto list (@PathVariable Long groupId){
        BattleGroups group = battleGroupsService.findById(groupId);
        BattleGroupsResponseDto responseDto = new BattleGroupsResponseDto(group);
        return responseDto;
    }
    // 그룹 가입
    @PostMapping("/enter/{groupId}")
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
                .startWeight(user.getProfiles().getCurrentWeight())
                .score(0.0)
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
    @GetMapping("/myGroups/{groupId}")
    @ResponseBody
    public List<GroupMembershipResponseDto> rank(@PathVariable Long groupId){
        BattleGroups group = battleGroupsService.findById(groupId);
        LocalDate startDate = group.getStartDate();
        BattlePurpose purpose = group.getBattlePurpose();
        BattleStatus status = group.getStatus();

        // 그룹에 속한 회원 정보 리스트
        List<GroupMembership> groupMembershipList = groupMembershipService.findByGroup(group);
        List<GroupMembershipResponseDto> responseDtoList = new ArrayList<>();

        for(GroupMembership membership : groupMembershipList){
            Users user = membership.getUsers();
            Double prevScore = membership.getScore();
            Double currentScore = prevScore;
            // 진행중인 경우
            if(status.equals(BattleStatus.PROGRESS)) {
                // 달리기 그룹인 경우
                if(purpose.equals(BattlePurpose.RUNNING)){
                    List<RunningRecords> runningRecordsList = runningRecordsService.findByUsersAndDateBetween(user, startDate, LocalDate.now());
                    currentScore = runningRecordsList.stream().mapToDouble(RunningRecords::getDistance).sum();
                }
                // 다이어트 인 경우
                else if(purpose.equals(BattlePurpose.DIET)){
                    currentScore = membership.getStartWeight() - user.getProfiles().getCurrentWeight();
                }
                // 증량인 경우
                else if(purpose.equals(BattlePurpose.WEIGHT_GAIN)){
                    currentScore = user.getProfiles().getCurrentWeight() - membership.getStartWeight();
                }

                if(!prevScore.equals(currentScore)) {
                    membership.updateScore(currentScore);
                }
            }
            responseDtoList.add(new GroupMembershipResponseDto(membership));
        }

        return responseDtoList;
    }
}

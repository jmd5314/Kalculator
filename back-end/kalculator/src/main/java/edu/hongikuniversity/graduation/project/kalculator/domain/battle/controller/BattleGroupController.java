package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request.BattleGroupCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupCreateResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattlePurpose;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleStatus;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.GroupMembership;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.service.BattleGroupService;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request.BattleGroupsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.GroupMembershipResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.Role;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.service.RunningRecordsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UsersService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/battle")
public class BattleGroupController {
    private final BattleGroupService battleGroupService;

    @PostMapping
    public ResponseEntity<ApiResponse<BattleGroupCreateResponse>> create(@RequestBody BattleGroupCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(battleGroupService.create(request)));
    }

    // 진행중인 그룹 조회
    @GetMapping("/list")
    @ResponseBody
    public List<BattleGroupsResponseDto> list (){
        List<BattleGroupsResponseDto> groupsResponseDtoList = new ArrayList<>();
        List<BattleGroup> groupsList = battleGroupService.findProgressingGroups();
        for(BattleGroup group : groupsList) {
            groupsResponseDtoList.add(new BattleGroupsResponseDto(group));
        }
        return groupsResponseDtoList;
    }
    @GetMapping("/{groupId}")
    @ResponseBody
    public BattleGroupsResponseDto list (@PathVariable Long groupId){
        BattleGroup group = battleGroupService.findById(groupId);
        BattleGroupsResponseDto responseDto = new BattleGroupsResponseDto(group);
        return responseDto;
    }
    // 그룹 가입
    @PostMapping("/enter/{groupId}")
    public ResponseEntity<String> join (@PathVariable Long groupId,Authentication authentication){
        BattleGroup group = battleGroupService.findById(groupId);
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
        BattleGroup group = battleGroupService.findById(groupId);
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
                    List<RunningRecord> runningRecordsList = runningRecordsService.findByUsersAndDateBetween(user, startDate, LocalDate.now());
                    currentScore = runningRecordsList.stream().mapToDouble(RunningRecord::getDistance).sum();
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
                    groupMembershipService.save(membership);
                }
            }
            responseDtoList.add(new GroupMembershipResponseDto(membership));
        }

        return responseDtoList;
    }

    @GetMapping("/today")
    public LocalDate today(){
        return LocalDate.now();
    }
}

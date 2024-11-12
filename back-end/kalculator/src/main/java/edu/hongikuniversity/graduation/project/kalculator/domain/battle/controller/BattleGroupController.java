package edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.request.BattleGroupCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupBriefResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupCreateResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.controller.dto.response.BattleGroupJoinResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.service.BattleGroupService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/battle")
public class BattleGroupController {
    private final BattleGroupService battleGroupService;

    @PostMapping
    public ResponseEntity<ApiResponse<BattleGroupCreateResponse>> create(@RequestBody BattleGroupCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(success(battleGroupService.create(request)));
    }

    // 진행중인 그룹 조회
    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<BattleGroupBriefResponse>>> getProgressList() {
        return ResponseEntity.ok().body(success(battleGroupService.getProgressList()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<BattleGroupDetailsResponse>> getGroupDetails(@RequestParam Long id) {
        return ResponseEntity.ok().body(success(battleGroupService.getGroupDetails(id)));
    }

    // 그룹 가입
    @PostMapping("/join")
    public ResponseEntity<ApiResponse<BattleGroupJoinResponse>> join(@RequestParam Long id) {
        return ResponseEntity.ok().body(success(battleGroupService.join(id)));
    }

    // 사용자가 가입한 그룹들 조회
    @GetMapping("/my-group")
    public ResponseEntity<ApiResponse<List<BattleGroupBriefResponse>>> getMyGroups() {
        return ResponseEntity.ok().body(success(battleGroupService.getMyGroups()));
    }
//
//    @GetMapping("/my-group")
//    public List<BattleGroupRankResponse> getRank(@RequestParam Long id) {
//        return ResponseEntity.ok().body(success(battleGroupService.getRank(id)));
//    }

}

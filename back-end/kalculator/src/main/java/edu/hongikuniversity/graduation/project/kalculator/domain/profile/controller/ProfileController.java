package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileUpdateWeightRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileCurrentWeightResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.service.ProfileService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/profile")
public class ProfileController {
    private final ProfileService profileService;

    /**
     * 프로필 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ProfileIdResponse>> save(@RequestBody ProfileRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(success(profileService.create(request)));
    }

    /**
     * 프로필 확인
     */
    @GetMapping
    public ResponseEntity<ApiResponse<ProfileDetailsResponse>> confirm() {
        return ResponseEntity.ok().body(success(profileService.confirm()));
    }

    /**
     * 프로필 업데이트
     */
    @PutMapping
    public ResponseEntity<ApiResponse<ProfileIdResponse>> update(@RequestBody ProfileRequest request) {
        return ResponseEntity.ok().body(success(profileService.update(request)));
    }

    /**
     * 프로필 현재 몸무게 업데이트
     */
    @PatchMapping
    public ResponseEntity<ApiResponse<ProfileCurrentWeightResponse>> updateCurrentWeight(@RequestBody ProfileUpdateWeightRequest request) {
        return ResponseEntity.ok().body(success(profileService.updateCurrentWeight(request)));
    }

}


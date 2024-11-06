package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.UpdateWeightDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.service.ProfilesService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfilesService profilesService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProfileIdResponse>> save(@RequestBody ProfileCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(profilesService.save(request)));
    }

    //프로필 확인
    @GetMapping
    public ProfilesResponseDto getProfile() {
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Profile profiles = users.getProfiles();
        ProfilesResponseDto responseDto = new ProfilesResponseDto(profiles);
        return responseDto;
    }

    @PutMapping
    public Long updateProfiles(@RequestBody ProfileUpdateRequest request) {
        profilesService.update(request);
    }

    @PatchMapping
    public ResponseEntity<String> updateCurrentWeight(@RequestBody UpdateWeightDto updateWeightDto, Authentication authentication) {
        Users users = usersService.findByUserId(authentication.getName());
        Profile profiles = users.getProfiles();
        profiles.updateCurrentWeight(updateWeightDto.getWeight());
        ;
        profilesService.save(profiles);
        return ResponseEntity.ok("몸무게를 성공적으로 저장하였습니다.");
    }
}


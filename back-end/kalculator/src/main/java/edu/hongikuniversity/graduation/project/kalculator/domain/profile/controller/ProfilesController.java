package edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.DietModeRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfilesUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.UpdateWeightDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.service.ProfilesService;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
public class ProfilesController {
    private final ProfilesService profilesService;
    private final UsersService usersService;

    //프로필 생성
    @PostMapping("/save")
    public Long save(@RequestBody ProfilesSaveRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Profiles profiles = requestDto.toEntity();
        profiles.setUsers(users);
        return profilesService.save(profiles);
    }
    //다이어트 모드 선택
    @PostMapping("/save/{profileId}/selectMode")
    public Long saveDietMode(@PathVariable Long profileId,@RequestBody DietModeRequestDto requestDto) {
        DietMode dietMode = DietMode.valueOf(requestDto.getDietMode().toUpperCase());
        Profiles profiles = profilesService.findById(profileId);
        profiles.setDietMode(dietMode);
        profilesService.save(profiles);
        return profiles.getProfileId();
    }
    //권장 칼로리
    @GetMapping("/save/{profileId}/targetCalories")
    public Integer getRecommendedCalories(@PathVariable Long profileId) {
        Profiles profiles = profilesService.findById(profileId);
        Integer recommendedCalories =  profiles.getRecommendedCalories();
        return recommendedCalories;
    }
    //프로필 확인
    @GetMapping("/confirm")
    @ResponseBody
    public ProfilesResponseDto confirmProfiles(Authentication authentication) {
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Profiles profiles = users.getProfiles();
        ProfilesResponseDto responseDto = new ProfilesResponseDto(profiles);
        return responseDto;
    }
    //홈
    @GetMapping("/home")
    @ResponseBody
    public ProfilesResponseDto Home(Authentication authentication) {
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Profiles profiles = users.getProfiles();
        ProfilesResponseDto responseDto = new ProfilesResponseDto(profiles);
        return responseDto;
    }
    @PutMapping("/update")
    public Long updateProfiles(@RequestBody ProfilesUpdateRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Long profileId = usersService.findByUserId(userId).getProfiles().getProfileId();
        Profiles profiles = profilesService.findById(profileId);
        profiles.updateProfiles(requestDto.toEntity());
        return profilesService.save(profiles);
    }
    @PutMapping("/update/{profileId}/selectMode")
    public Long updateDietMode(@PathVariable Long profileId,@RequestBody DietModeRequestDto requestDto) {
        DietMode dietMode = DietMode.valueOf(requestDto.getDietMode().toUpperCase());
        Profiles profiles = profilesService.findById(profileId);
        profiles.setDietMode(dietMode);
        profilesService.save(profiles);
        return profiles.getProfileId();
    }
    @GetMapping("/update/{profileId}/targetCalories")
    public Integer getUpdateRecommendedCalories(@PathVariable Long profileId) {
        Profiles profiles = profilesService.findById(profileId);
        Integer recommendedCalories =  profiles.getRecommendedCalories();
        return recommendedCalories;
    }
    @PutMapping("/update/currentWeight")
    public ResponseEntity<String> updateCurrentWeight(@RequestBody UpdateWeightDto updateWeightDto, Authentication authentication){
        Users users = usersService.findByUserId(authentication.getName());
        Profiles profiles = users.getProfiles();
        profiles.updateCurrentWeight(updateWeightDto.getWeight());;
        profilesService.save(profiles);
        return ResponseEntity.ok("몸무게를 성공적으로 저장하였습니다.");
    }
}


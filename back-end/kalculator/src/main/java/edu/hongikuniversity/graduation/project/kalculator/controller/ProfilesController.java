package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.DietModeRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
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
        profiles.updateProfiles(profiles.getTargetWeight(),profiles.getAge(),profiles.getGender(),profiles.getHeight()
        ,profiles.getWeight(),profiles.getActivityLevel(),profiles.getPurposeOfUse(),dietMode);
        profilesService.save(profiles);
        return profiles.getProfileId();
    }
    //권장 칼로리
    @GetMapping("/save/{profileId}/targetCalories")
    public Double getRecommendedCalories(@PathVariable Long profileId) {
        Profiles profiles = profilesService.findById(profileId);
        Double recommendedCalories =  profiles.getRecommendedCalories();
        return recommendedCalories;
    }
    //프로필 확인
    @GetMapping("/confirm/{profileId}")
    @ResponseBody
    public ProfilesResponseDto confirmProfiles(@PathVariable Long profileId) {
        Profiles profiles = profilesService.findById(profileId);
        ProfilesResponseDto responseDto = new ProfilesResponseDto(profiles);
        return responseDto;
    }
    //홈
    @GetMapping("/home/{profileId}")
    @ResponseBody
    public ProfilesResponseDto Home(@PathVariable Long profileId) {
        Profiles profiles = profilesService.findById(profileId);
        ProfilesResponseDto responseDto = new ProfilesResponseDto(profiles);
        return responseDto;
    }
    @PutMapping("/home/{profileId}/updateWeight")
    public Long updateWeight(@PathVariable Long profileId, @RequestBody double weight){
        Profiles profiles = profilesService.findById(profileId);
        profiles.updateWeight(weight);
        return profiles.getProfileId();
    }
}


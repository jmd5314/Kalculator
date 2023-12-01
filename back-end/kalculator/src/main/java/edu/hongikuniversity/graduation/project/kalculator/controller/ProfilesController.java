package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.DietModeRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;

import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
public class ProfilesController {
    private final ProfilesService profilesService;
    private final UsersService usersService;
    @PostMapping("/save")
    public Long save(@RequestBody ProfilesSaveRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Profiles profiles = requestDto.toEntity();
        profiles.setUsers(users);
        return profilesService.save(profiles);
    }
    @PostMapping("/save/{profileId}/selectMode")
    public Long saveDietMode(@PathVariable Long profileId,@RequestBody DietModeRequestDto requestDto) {
        DietMode dietMode = DietMode.valueOf(requestDto.getDietMode().toUpperCase());
        Profiles profiles = profilesService.findById(profileId);
        profiles.updateProfiles(profiles.getTargetWeight(),profiles.getAge(),profiles.getGender(),profiles.getHeight()
        ,profiles.getWeight(),profiles.getActivityLevel(),profiles.getPurposeOfUse(),dietMode);
        profilesService.save(profiles);
        return profiles.getProfileId();
    }
    @GetMapping("/save/{profileId}/targetCalories")
    public ResponseEntity<Double> getRecommendedCalories(@PathVariable Long profileId) {
        try {
            Profiles profiles = profilesService.findById(profileId);

            double recommendedCalories = profiles.getRecommendedCalories();

            return ResponseEntity.ok(recommendedCalories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
}
}


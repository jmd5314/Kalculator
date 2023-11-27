package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.DietModeRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
public class ProfilesController {
    private final ProfilesService profilesService;
    @PostMapping("/save")
    public Long save(@RequestBody ProfilesSaveRequestDto requestDto){
        return profilesService.save(requestDto);
    }
    @PostMapping("/saveDietMode")
    public Long saveDietMode(@RequestBody DietModeRequestDto requestDto) {
        DietMode dietMode = DietMode.valueOf(requestDto.getDietMode().toUpperCase());
        Profiles profiles = profilesService.findById(requestDto.getProfileId());
        profiles.updateProfiles(profiles.getTargetWeight(),profiles.getAge(),profiles.getGender(),profiles.getHeight()
        ,profiles.getWeight(),profiles.getActivityLevel(),profiles.getPurposeOfUse(),dietMode);
        profilesService.save(profiles);
        return profiles.getProfileId();
    }
    @GetMapping("/getRecommendedCalories/{profileId}")
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


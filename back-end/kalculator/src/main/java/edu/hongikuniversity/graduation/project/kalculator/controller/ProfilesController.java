package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.DietMode;
import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.DietModeRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.engine.transaction.jta.platform.internal.AtomikosJtaPlatform;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    @GetMapping("/targetCalrories")
    public Long calculateCalrories(){
        
    }
}


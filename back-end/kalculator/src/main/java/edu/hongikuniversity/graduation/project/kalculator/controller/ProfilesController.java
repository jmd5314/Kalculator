package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.dto.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.dto.ProfilesUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class ProfilesController {
    private final ProfilesService profilesService;
    @PostMapping("/profiles/save")
    public Long save(@RequestBody ProfilesSaveRequestDto requestDto){
        return profilesService.save(requestDto);
    }
    @PutMapping("/profiles/update/{id}")
    public Long update(@PathVariable Long id, @RequestBody ProfilesUpdateRequestDto requestDto){
        return profilesService.update(id, requestDto);
    }
    @GetMapping("/profiles/{id}")
    public ProfilesResponseDto findById(@PathVariable Long id){
        return profilesService.findById(id);
    }

}

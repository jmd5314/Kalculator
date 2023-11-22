package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.ProfilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
public class ProfilesController {
    private final ProfilesService profilesService;
    @PostMapping("/save")
    public Long save(@RequestBody ProfilesSaveRequestDto requestDto){
        return profilesService.save(requestDto);
    }

}

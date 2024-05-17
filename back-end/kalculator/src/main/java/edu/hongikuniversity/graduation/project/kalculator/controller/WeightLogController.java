package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.WeightLog;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.UpdateWeightDto;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import edu.hongikuniversity.graduation.project.kalculator.service.WeightLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/weightLog")
public class WeightLogController {
    private final WeightLogService weightLogService;
    private final UsersService usersService;
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody UpdateWeightDto updateWeightDto, Authentication authentication){
        Users users = usersService.findByUserId(authentication.getName());
        if (weightLogService.findByUsersAndDate(users, LocalDate.now())) {
            return ResponseEntity.badRequest().body("오늘 몸무게가 이미 저장되었습니다.");
        }
        WeightLog weightLog = WeightLog.builder()
                .weight(updateWeightDto.getWeight())
                .date(LocalDate.now())
                .build();
        weightLog.setUsers(users);
        weightLogService.save(weightLog);
        return ResponseEntity.ok("몸무게를 성공적으로 저장하였습니다.");
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.running.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecords;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.service.RunningRecordsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/runningRecords")
@RequiredArgsConstructor
public class RunningRecordsController {
    private final RunningRecordsService runningRecordsService;
    private final UsersService usersService;
    @PostMapping("/save")
    public ResponseEntity<String> save (@RequestBody RunningRecordsRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        Users user = usersService.findByUserId(userId);
        RunningRecords runningRecords = RunningRecords.builder()
                .date(LocalDate.now())
                .time(requestDto.getTime())
                .distance(requestDto.getDistance())
                .build();
        runningRecords.setCaloriesBurned(user.getProfiles().getWeight());
        runningRecords.setUsers(user);
        runningRecordsService.save(runningRecords);
        return ResponseEntity.ok("달리기를 기록하였습니다.");
    }
    @GetMapping("list")
    @ResponseBody
    public List<RunningRecordsResponseDto> list ( Authentication authentication){
        String userId = authentication.getName();
        Users user = usersService.findByUserId(userId);
        List<RunningRecordsResponseDto> responseDtoList = new ArrayList<>();
        List<RunningRecords> runningRecordsList = runningRecordsService.findByUsersAndDate(user, LocalDate.now());
        for(RunningRecords runningRecords:runningRecordsList){
            responseDtoList.add(new RunningRecordsResponseDto(runningRecords));
        }
        return responseDtoList;
    }
}

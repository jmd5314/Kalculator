package edu.hongikuniversity.graduation.project.kalculator.domain.running.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.request.RunningRecordSaveRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response.RunningRecordIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response.RunningRecordResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.service.RunningRecordService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse.success;

@RestController
@RequestMapping("/api/v1/running")
@RequiredArgsConstructor
public class RunningRecordController {
    private final RunningRecordService runningRecordService;

    @PostMapping
    public ResponseEntity<ApiResponse<RunningRecordIdResponse>> save (@RequestBody RunningRecordSaveRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(success(runningRecordService.save(request)));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<RunningRecordResponse>>> getTodayList (){
        return ResponseEntity.ok().body(success(runningRecordService.getTodayList()));
    }
}

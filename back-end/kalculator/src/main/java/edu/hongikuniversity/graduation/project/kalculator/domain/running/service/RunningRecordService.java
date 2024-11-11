package edu.hongikuniversity.graduation.project.kalculator.domain.running.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.request.RunningRecordSaveRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response.RunningRecordIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response.RunningRecordResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.repository.RunningRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RunningRecordService {
    private final RunningRecordRepository runningRecordRepository;

    @Transactional
    public RunningRecordIdResponse save(RunningRecordSaveRequest request) {
        double currentWeight = getCurrentUser().getProfile().getCurrentWeight();
        RunningRecord runningRecord = RunningRecord.builder()
                .user(getCurrentUser())
                .distance(request.distance())
                .time(request.time())
                .weight(currentWeight)
                .build();
        runningRecordRepository.save(runningRecord);

        return RunningRecordIdResponse.from(runningRecord);
    }

    public List<RunningRecordResponse> getTodayList() {
        LocalDate today = LocalDate.now();

        List<RunningRecord> runningRecords = runningRecordRepository.findByUserAndDate(getCurrentUser(), today);

        return runningRecords
                .stream()
                .map(RunningRecordResponse::from)
                .toList();
    }
}

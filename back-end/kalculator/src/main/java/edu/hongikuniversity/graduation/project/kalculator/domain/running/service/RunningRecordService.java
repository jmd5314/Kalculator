package edu.hongikuniversity.graduation.project.kalculator.domain.running.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.running.repository.RunningRecordsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RunningRecordService {
    private final RunningRecordsRepository runningRecordsRepository;
    @Transactional
    public Long save(RunningRecord runningRecords) {
        return runningRecordsRepository.save(runningRecords).getRecordId();
    }

    public List<RunningRecord> findByUsersAndDate(Users user, LocalDate date) {
        return runningRecordsRepository.findByUsersAndDate(user, date);
    }

    public List<RunningRecord> findByUsersAndDateBetween(Users user, LocalDate startDate, LocalDate endDate) {
        return runningRecordsRepository.findByUsersAndDateBetween(user, startDate, endDate);
    }
}

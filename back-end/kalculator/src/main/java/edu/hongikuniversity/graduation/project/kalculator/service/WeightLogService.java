package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.controller.WeightLogController;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.WeightLog;
import edu.hongikuniversity.graduation.project.kalculator.repository.WeightLogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class WeightLogService {
    private final WeightLogRepository weightLogRepository;
    @Transactional
    public Long save(WeightLog weightLog) {
        return weightLogRepository.save(weightLog).getLogId();
    }

    public boolean findByUsersAndDate(Users users, LocalDate date) {
        return weightLogRepository.findByUsersAndDate(users,date).isPresent();
    }
}

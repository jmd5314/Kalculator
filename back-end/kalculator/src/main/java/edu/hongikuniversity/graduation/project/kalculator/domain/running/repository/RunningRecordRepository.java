package edu.hongikuniversity.graduation.project.kalculator.domain.running.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RunningRecordRepository extends JpaRepository<RunningRecord, Long> {
    List<RunningRecord> findByUsersAndDate(Users user, LocalDate date);
    List<RunningRecord> findByUsersAndDateBetween(Users user, LocalDate startDate, LocalDate endDate);

}

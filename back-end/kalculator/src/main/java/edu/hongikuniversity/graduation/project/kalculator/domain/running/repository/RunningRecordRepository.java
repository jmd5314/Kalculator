package edu.hongikuniversity.graduation.project.kalculator.domain.running.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RunningRecordRepository extends JpaRepository<RunningRecord, Long> {
    List<RunningRecord> findByUserAndDate(User user, LocalDate date);
}

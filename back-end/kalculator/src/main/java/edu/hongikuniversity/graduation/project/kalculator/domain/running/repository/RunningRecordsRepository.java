package edu.hongikuniversity.graduation.project.kalculator.domain.running.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecords;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RunningRecordsRepository extends JpaRepository<RunningRecords, Long> {
    List<RunningRecords> findByUsersAndDate(Users user, LocalDate date);
    List<RunningRecords> findByUsersAndDateBetween(Users user, LocalDate startDate, LocalDate endDate);

}

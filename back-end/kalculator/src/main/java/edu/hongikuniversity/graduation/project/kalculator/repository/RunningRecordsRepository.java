package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.RunningRecords;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RunningRecordsRepository extends JpaRepository<RunningRecords, Long> {
    List<RunningRecords> findByUsersAndDate(Users user, LocalDate date);

}

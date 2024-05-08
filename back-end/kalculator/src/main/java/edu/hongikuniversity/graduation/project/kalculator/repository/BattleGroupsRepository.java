package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BattleGroupsRepository extends JpaRepository<BattleGroups,Long> {
    List<BattleGroups> findByStatus(BattleStatus status);
}

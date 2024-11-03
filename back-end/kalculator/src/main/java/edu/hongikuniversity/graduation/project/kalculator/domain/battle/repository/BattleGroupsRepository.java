package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroups;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BattleGroupsRepository extends JpaRepository<BattleGroups,Long> {
    List<BattleGroups> findByStatus(BattleStatus status);
}

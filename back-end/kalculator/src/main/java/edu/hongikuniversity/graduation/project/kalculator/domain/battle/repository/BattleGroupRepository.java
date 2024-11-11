package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BattleGroupRepository extends JpaRepository<BattleGroup, Long> {
    List<BattleGroup> findByStatus(BattleStatus status);
}

package edu.hongikuniversity.graduation.project.kalculator.domain.battle.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.entity.BattleGroup;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;

import java.util.List;

public interface CustomBattleGroupRepository {
    List<BattleGroup> findByUser(User user);
}

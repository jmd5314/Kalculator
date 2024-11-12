package edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class BattleGroupNotFoundException extends AppException {
    public BattleGroupNotFoundException(Long id) {
        super(
                ErrorCode.GROUP_NOT_FOUND, id);
    }
}

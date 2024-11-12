package edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class BattleGroupFullException extends AppException {
    public BattleGroupFullException() {
        super(ErrorCode.GROUP_ALREADY_FULL);
    }
}

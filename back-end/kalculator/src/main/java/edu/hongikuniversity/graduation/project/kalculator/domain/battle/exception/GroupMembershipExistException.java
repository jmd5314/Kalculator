package edu.hongikuniversity.graduation.project.kalculator.domain.battle.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

public class GroupMembershipExistException extends AppException {
    public GroupMembershipExistException() {
        super(ErrorCode.MEMBERSHIP_ALREADY_EXIST);

    }
}

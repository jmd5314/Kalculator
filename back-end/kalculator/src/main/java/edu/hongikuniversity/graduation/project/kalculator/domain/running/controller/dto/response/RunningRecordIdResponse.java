package edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;

public record RunningRecordIdResponse(Long id) {
    public static RunningRecordIdResponse from(RunningRecord runningRecord) {
        return new RunningRecordIdResponse(runningRecord.getId());
    }
}

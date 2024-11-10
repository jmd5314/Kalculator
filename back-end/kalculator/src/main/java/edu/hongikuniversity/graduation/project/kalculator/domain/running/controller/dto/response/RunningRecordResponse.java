package edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;

public record RunningRecordResponse(
        double time,
        double distance,
        double caloriesBurned
) {
    public static RunningRecordResponse from(RunningRecord runningRecord){
        return new RunningRecordResponse(
                runningRecord.getTime(),
                runningRecord.getDistance(),
                runningRecord.getCaloriesBurned()
        );
    }

}

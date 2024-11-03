package edu.hongikuniversity.graduation.project.kalculator.domain.running.controller.dto.response;

import edu.hongikuniversity.graduation.project.kalculator.domain.running.entity.RunningRecord;
import lombok.Getter;

@Getter
public class RunningRecordResponseDto {
    private Double time;
    private Double distance;
    private Double caloriesBurned;
    public RunningRecordResponseDto(RunningRecord entity){
        this.time = entity.getTime();
        this.distance = entity.getDistance();
        this.caloriesBurned = entity.getCaloriesBurned();
    }

}

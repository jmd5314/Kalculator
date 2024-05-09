package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.RunningRecords;
import lombok.Getter;

@Getter
public class RunningRecordsResponseDto {
    private Double time;
    private Double distance;
    private Double caloriesBurned;
    public RunningRecordsResponseDto(RunningRecords entity){
        this.time = entity.getTime();
        this.distance = entity.getDistance();
        this.caloriesBurned = entity.getCaloriesBurned();
    }

}

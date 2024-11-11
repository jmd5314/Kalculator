package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.request.FoodRecordSaveRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealStatusResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealTypeResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordTotalResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.service.FoodRecordService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/food")
public class FoodRecordController {
    private final FoodRecordService foodRecordService;

    @PostMapping
    public ResponseEntity<ApiResponse<List<FoodRecordIdResponse>>> save(@RequestBody List<FoodRecordSaveRequest> requests){
        return ResponseEntity.status(HttpStatus.CREATED).body(success(foodRecordService.save(requests)));

    }

    @GetMapping("/total")
    public ResponseEntity<ApiResponse<FoodRecordTotalResponse>> getTodayTotalNutrients() {
        return ResponseEntity.ok().body(success(foodRecordService.getTodayTotalNutrients()));
    }

    @GetMapping("/meal")
    public ResponseEntity<ApiResponse<FoodRecordMealTypeResponse>> getMealTypeCalories(){
        return ResponseEntity.ok().body(success(foodRecordService.getMealTypeCalories()));
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<FoodRecordMealStatusResponse>> getMealStatus() {
        return ResponseEntity.ok().body(success(foodRecordService.getMealStatus()));
    }
}

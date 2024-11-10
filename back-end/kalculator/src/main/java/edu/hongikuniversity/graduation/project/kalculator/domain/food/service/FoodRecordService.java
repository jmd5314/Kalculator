package edu.hongikuniversity.graduation.project.kalculator.domain.food.service;

import com.querydsl.core.Tuple;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.request.FoodRecordSaveRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealStatusResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordMealTypeResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodRecordTotalResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.repository.FoodRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.EnumMap;
import java.util.List;
import java.util.Optional;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FoodRecordService {
    private final FoodRecordRepository foodRecordRepository;

    @Transactional
    public List<FoodRecordIdResponse> save(List<FoodRecordSaveRequest> requests) {
        List<FoodRecord> foodRecords
                = requests.stream()
                .map(FoodRecordSaveRequest::toEntity)
                .toList();
        foodRecordRepository.saveAll(foodRecords);

        return foodRecords.stream()
                .map(FoodRecordIdResponse::from)
                .toList();
    }


    public FoodRecordTotalResponse getTodayTotalNutrients() {
        LocalDate today = LocalDate.now();
        List<FoodRecord> foodRecords = foodRecordRepository.findByDateAndUser(today, getCurrentUser());
        return calculateTotalNutrients(foodRecords);

    }

    private FoodRecordTotalResponse calculateTotalNutrients(List<FoodRecord> foodRecords) {
        int totalCalories = (int) foodRecords.stream().mapToDouble(FoodRecord::getCalories).sum();
        int totalCarbohydrates = (int) foodRecords.stream().mapToDouble(FoodRecord::getCarbohydrates).sum();
        int totalProteins = (int) foodRecords.stream().mapToDouble(FoodRecord::getProteins).sum();
        int totalFats = (int) foodRecords.stream().mapToDouble(FoodRecord::getFats).sum();
        return new FoodRecordTotalResponse(totalCalories, totalCarbohydrates, totalProteins, totalFats);
    }


    public FoodRecordMealTypeResponse getMealTypeCalories() {
        LocalDate today = LocalDate.now();
        List<Tuple> mealTypeCalories = foodRecordRepository.getMealTypeCalories(today, getCurrentUser());
        return collectMealTypeCalories(mealTypeCalories);
    }

    private FoodRecordMealTypeResponse collectMealTypeCalories(List<Tuple> mealTypCalories) {
        EnumMap<MealType, Integer> caloriesMap = new EnumMap<>(MealType.class);

        for (MealType mealType : MealType.values()) {
            caloriesMap.put(mealType, 0);
        }

        for (Tuple tuple : mealTypCalories) {
            MealType mealType = tuple.get(0, MealType.class);
            int calories = Optional.ofNullable(tuple.get(1, Double.class))
                    .orElse(0.0).intValue();
            caloriesMap.put(mealType, calories);
        }
        return FoodRecordMealTypeResponse.from(caloriesMap);
    }

    public FoodRecordMealStatusResponse getMealStatus() {
        LocalDate today = LocalDate.now();
        List<MealType> mealTypes = foodRecordRepository.getMealTypes(today, getCurrentUser());
        return calculateMealStatus(mealTypes);
    }

    private FoodRecordMealStatusResponse calculateMealStatus(List<MealType> mealTypes) {
        EnumMap<MealType, Boolean> statusMap = new EnumMap<>(MealType.class);

        for (MealType mealType : MealType.values()) {
            statusMap.put(mealType, false);
        }

        for (MealType mealType: mealTypes){
            statusMap.put(mealType, true);
        }

        return FoodRecordMealStatusResponse.from(statusMap);
    }
}

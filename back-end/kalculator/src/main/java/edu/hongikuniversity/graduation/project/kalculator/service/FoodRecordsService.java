package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FoodRecordsService {
    private final FoodRecordsRepository foodRecordsRepository;
    //음식 기록
    @Transactional
    public FoodRecords foodRecord(List<Foods> foodsList,Users users){
        //현재 날짜
        LocalDate today = LocalDate.now();
        Optional<FoodRecords> foodRecordsOptional = foodRecordsRepository.findByDateAndUsers(today,users);
        FoodRecords foodRecords;
        if(foodRecordsOptional.isPresent()) { // 존재하면
            foodRecords = foodRecordsOptional.get();
            for(Foods food:foodsList){
                foodRecords.addFoods(food);
            }
        }
        else{ // 존재하지 않는다면
            foodRecords = FoodRecords.builder().date(today).build();
            foodRecords.setUsers(users);
            for(Foods food:foodsList){
                foodRecords.addFoods(food);
            }
        }
        return foodRecordsRepository.save(foodRecords);
    }
    //음식 기록 저장
    @Transactional
    public Long save(FoodRecords foodRecords){
        return foodRecordsRepository.save(foodRecords).getRecordId();
    }
    // 식사 유형별 칼로리
    public Integer MealCalories(MealType mealType){
        LocalDate today = LocalDate.now();
        FoodRecords foodRecords = foodRecordsRepository.findByDate(today)
                .orElseThrow(()->new IllegalArgumentException("식단이 존재하지 않습니다."));
        List<Foods> foodsList = foodRecords.getFoods().stream()
                .filter(foods -> foods.getMealType() == mealType)
                .collect(Collectors.toList());
        double sum = 0.0;
        for(Foods foods:foodsList){
            sum+=foods.getCalories();
        }
        return (int)Math.round(sum);
    }
    // 하루 전체 칼로리
    public Integer DailyCalories(){
        LocalDate today = LocalDate.now();
        FoodRecords foodRecords = foodRecordsRepository.findByDate(today)
                .orElseThrow(()->new IllegalArgumentException("식단이 존재하지 않습니다."));
        List<Foods>foodsList = foodRecords.getFoods();
        double sum = 0.0;
        for(Foods foods: foodsList){
            sum+=foods.getCalories();
        }
        return (int) Math.round(sum);
    }

    public FoodRecords findByRecordId(Long recordId) {
        return foodRecordsRepository.findById(recordId).orElseThrow(() -> new IllegalArgumentException("음식 기록을 찾을 수 없습니다."));
    }
}

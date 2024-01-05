package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FoodRecordsService {
    private final FoodRecordsRepository foodRecordsRepository;
    //음식 기록
    @Transactional
    public Long foodRecord( List<Foods> foods){
        //현재 날짜
        LocalDate today = LocalDate.now();
        Optional<FoodRecords> foodRecordsOptional = foodRecordsRepository.findByDate(today);
        FoodRecords foodRecords;
        if(foodRecordsOptional.isPresent()) { // 존재하면
            foodRecords = foodRecordsOptional.get();
            foodRecords.addFoods(foods);
        }
        else{ // 존재하지 않는다면
            foodRecords = FoodRecords.builder().date(today).build();
            foodRecords.addFoods(foods);
        }
        return foodRecordsRepository.save(foodRecords).getRecordId();
    }
    /*/ 식사 유형별 칼로리
    @Transactional
    public Integer MealCalories(){
        LocalDate today = LocalDate.now();
        FoodRecords foodRecords = foodRecordsRepository.findByDate(today)
                .orElseThrow(()->new IllegalArgumentException("식단이 존재하지 않습니다."));

    }
    // 하루 전체 칼로리
    @Transactional
    public Integer DailyCalories(){

    }*/
}

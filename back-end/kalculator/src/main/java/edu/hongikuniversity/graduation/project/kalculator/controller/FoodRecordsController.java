package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.FoodRecords;
import edu.hongikuniversity.graduation.project.kalculator.domain.Foods;
import edu.hongikuniversity.graduation.project.kalculator.domain.MealType;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.FoodsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.FoodsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.FoodRecordsService;
import edu.hongikuniversity.graduation.project.kalculator.service.FoodsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/foodRecords")
public class FoodRecordsController {
    private final FoodRecordsService foodRecordsService;
    private final UsersService usersService;
    private final FoodsService foodsService;
    //음식 추가
    @PostMapping("/save")
    public Long save(@RequestBody List<FoodsSaveRequestDto> requestDtoList, Authentication authentication){
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        List<Foods> foodsList = new ArrayList<>();
        for(FoodsSaveRequestDto requestDto:requestDtoList){
            Foods foods = Foods.builder().foodName(requestDto.getFoodName()).calories(requestDto.getCalories())
                    .fats(requestDto.getFats()).carbohydrates(requestDto.getCarbohydrates()).proteins(requestDto.getProteins())
                    .mealType(MealType.valueOf(requestDto.getMealType().toUpperCase()))
                    .quantity(requestDto.getQuantity()).build();
            foodsService.save(foods);
            foodsList.add(foods);
        }
        FoodRecords foodRecords = foodRecordsService.foodRecord(foodsList,users);
        return foodRecords.getRecordId();
    }
    @GetMapping("/total")
    @ResponseBody
    public FoodsResponseDto total(Authentication authentication){
        int totalCalories = 0;
        int totalCarbohydrates = 0;
        int totalProteins = 0;
        int totalFats = 0;
        String userId = authentication.getName();
        List<FoodRecords> foodRecordsList = usersService.findByUserId(userId).getFoodRecords();
        LocalDate today = LocalDate.now();
        List<FoodRecords> todayFoodRecords = foodRecordsList
                .stream()
                .filter(record -> record.getDate().equals(today))
                .collect(Collectors.toList());
        for(FoodRecords foodRecords:todayFoodRecords){
            List<Foods> foods = foodRecords.getFoods();
            for(Foods food: foods){
                totalCalories += food.getCalories()*food.getQuantity();
                totalCarbohydrates += food.getCarbohydrates()*food.getQuantity();
                totalProteins += food.getProteins()*food.getQuantity();
                totalFats += food.getFats()*food.getQuantity();
            }
        }
        FoodsResponseDto foodsResponseDto = FoodsResponseDto.builder().totalCalories(totalCalories).totalCarbohydrates(totalCarbohydrates)
                .totalProteins(totalProteins).totalFats(totalFats).build();
        return foodsResponseDto;
    }
    @GetMapping("/{mealType}/Calories")
    @ResponseBody
    public Integer mealTypeCalories(@PathVariable String mealType, Authentication authentication){
        int Calories = 0;
        String userId = authentication.getName();
        List<FoodRecords> foodRecordsList = usersService.findByUserId(userId).getFoodRecords();
        LocalDate today = LocalDate.now();
        List<Foods> foodsList = foodRecordsList
                .stream()
                .filter(record -> record.getDate().equals(today))
                .flatMap(record -> record.getFoods().stream())
                .filter(food -> MealType.valueOf(mealType.toUpperCase()).equals(food.getMealType()))
                .collect(Collectors.toList());
        for(Foods foods:foodsList){
            Calories += foods.getCalories()*foods.getQuantity();
        }
        return Calories;
    }
}

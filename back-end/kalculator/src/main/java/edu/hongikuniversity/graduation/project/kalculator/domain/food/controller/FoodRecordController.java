package edu.hongikuniversity.graduation.project.kalculator.domain.food.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.FoodRecord;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.Food;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.MealType;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.FoodResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.request.FoodsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.controller.dto.response.MealStatusResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.service.FoodRecordsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.food.service.FoodsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UsersService;
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
public class FoodRecordController {
    private final FoodRecordsService foodRecordsService;
    private final UsersService usersService;
    private final FoodsService foodsService;
    //음식 추가
    @PostMapping("/save")
    public Long save(@RequestBody List<FoodsSaveRequestDto> requestDtoList, Authentication authentication){
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        List<Food> foodsList = new ArrayList<>();
        for(FoodsSaveRequestDto requestDto:requestDtoList){
            Food foods = Food.builder().foodName(requestDto.getFoodName()).calories(requestDto.getCalories())
                    .fats(requestDto.getFats()).carbohydrates(requestDto.getCarbohydrates()).proteins(requestDto.getProteins())
                    .mealType(MealType.valueOf(requestDto.getMealType().toUpperCase()))
                    .quantity(requestDto.getQuantity()).build();
            foodsService.save(foods);
            foodsList.add(foods);
        }
        FoodRecord foodRecords = foodRecordsService.foodRecord(foodsList,users);
        return foodRecords.getRecordId();
    }
    @GetMapping("/total")
    @ResponseBody
    public FoodResponseDto total(Authentication authentication){
        int totalCalories = 0;
        int totalCarbohydrates = 0;
        int totalProteins = 0;
        int totalFats = 0;
        String userId = authentication.getName();
        List<FoodRecord> foodRecordsList = usersService.findByUserId(userId).getFoodRecords();
        LocalDate today = LocalDate.now();
        List<FoodRecord> todayFoodRecords = foodRecordsList
                .stream()
                .filter(record -> record.getDate().equals(today))
                .collect(Collectors.toList());
        for(FoodRecord foodRecords:todayFoodRecords){
            List<Food> foods = foodRecords.getFoods();
            for(Food food: foods){
                totalCalories += food.getCalories()*food.getQuantity();
                totalCarbohydrates += food.getCarbohydrates()*food.getQuantity();
                totalProteins += food.getProteins()*food.getQuantity();
                totalFats += food.getFats()*food.getQuantity();
            }
        }
        FoodResponseDto foodResponseDto = FoodResponseDto.builder().totalCalories(totalCalories).totalCarbohydrates(totalCarbohydrates)
                .totalProteins(totalProteins).totalFats(totalFats).build();
        return foodResponseDto;
    }
    @GetMapping("/{mealType}/Calories")
    @ResponseBody
    public Integer mealTypeCalories(@PathVariable String mealType, Authentication authentication){
        int Calories = 0;
        String userId = authentication.getName();
        List<FoodRecord> foodRecordsList = usersService.findByUserId(userId).getFoodRecords();
        LocalDate today = LocalDate.now();
        List<Food> foodsList = foodRecordsList
                .stream()
                .filter(record -> record.getDate().equals(today))
                .flatMap(record -> record.getFoods().stream())
                .filter(food -> MealType.valueOf(mealType.toUpperCase()).equals(food.getMealType()))
                .collect(Collectors.toList());
        for(Food foods:foodsList){
            Calories += foods.getCalories()*foods.getQuantity();
        }
        return Calories;
    }
    @GetMapping("/status")
    @ResponseBody
    public MealStatusResponseDto getMealStatus(Authentication authentication) {
        String userId = authentication.getName();
        List<FoodRecord> foodRecordsList = usersService.findByUserId(userId).getFoodRecords();
        LocalDate today = LocalDate.now();

        boolean breakfast = foodRecordsList.stream()
                .filter(record -> record.getDate().equals(today) && record.getUsers().getUserId().equals(userId))
                .flatMap(record -> record.getFoods().stream())
                .anyMatch(food -> food.getMealType() == MealType.BREAKFAST);

        boolean lunch = foodRecordsList.stream()
                .filter(record -> record.getDate().equals(today) && record.getUsers().getUserId().equals(userId))
                .flatMap(record -> record.getFoods().stream())
                .anyMatch(food -> food.getMealType() == MealType.LUNCH);

        boolean dinner = foodRecordsList.stream()
                .filter(record -> record.getDate().equals(today) && record.getUsers().getUserId().equals(userId))
                .flatMap(record -> record.getFoods().stream())
                .anyMatch(food -> food.getMealType() == MealType.DINNER);

        return new MealStatusResponseDto(breakfast, lunch, dinner);
    }
}

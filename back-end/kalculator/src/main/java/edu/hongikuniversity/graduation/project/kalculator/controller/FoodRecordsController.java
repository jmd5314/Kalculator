package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.FoodRecords;
import edu.hongikuniversity.graduation.project.kalculator.domain.Foods;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.FoodsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.FoodRecordsService;
import edu.hongikuniversity.graduation.project.kalculator.service.FoodsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
        List<Foods> foodsList = new ArrayList<>();
        for(FoodsSaveRequestDto requestDto:requestDtoList){
            Foods foods = Foods.builder().foodName(requestDto.getFoodName()).calories(requestDto.getCalories())
                    .fats(requestDto.getFats()).carbohydrates(requestDto.getCarbohydrates()).proteins(requestDto.getProteins())
                    .quantity(requestDto.getQuantity()).build();
            foodsService.save(foods);
            foodsList.add(foods);
        }
        FoodRecords foodRecords = foodRecordsService.foodRecord(foodsList);
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        foodRecords.setUsers(users);
        return foodRecordsService.save(foodRecords);
    }
}

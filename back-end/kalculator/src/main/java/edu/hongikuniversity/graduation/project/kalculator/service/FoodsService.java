package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Foods;
import edu.hongikuniversity.graduation.project.kalculator.repository.FoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FoodsService {
    private final FoodsRepository foodsRepository;
    //음식 저장
    @Transactional
    public Long save(Foods foods){
        return foodsRepository.save(foods).getFoodId();
    }

}

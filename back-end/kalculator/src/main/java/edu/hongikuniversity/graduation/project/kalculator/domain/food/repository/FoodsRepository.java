package edu.hongikuniversity.graduation.project.kalculator.domain.food.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.food.entity.Foods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodsRepository extends JpaRepository<Foods,Long> {
}

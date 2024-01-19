package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.Foods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodsRepository extends JpaRepository<Foods,Long> {
}

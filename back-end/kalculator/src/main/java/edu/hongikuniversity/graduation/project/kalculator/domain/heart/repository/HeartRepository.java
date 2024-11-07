package edu.hongikuniversity.graduation.project.kalculator.domain.heart.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart,Long> {

    @Query("select h from Heart h where h.user.id = :userId and h.post.id = :postId")
    Optional<Heart> findByUserIdAndPostId(Long userId, Long postId);


    @Modifying
    @Query("delete from Heart h where h.user.id = :userId and h.post.id = :postId")
    void deleteByUserIdAndPostId(Long userId, Long postId);
}

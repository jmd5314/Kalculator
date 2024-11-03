package edu.hongikuniversity.graduation.project.kalculator.domain.heart.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HeartsRepository extends JpaRepository<Hearts,Long> {
    Optional<Hearts> findByUsersAndPosts(Users users, Posts posts);

    List<Hearts> findByPosts(Posts posts);
}

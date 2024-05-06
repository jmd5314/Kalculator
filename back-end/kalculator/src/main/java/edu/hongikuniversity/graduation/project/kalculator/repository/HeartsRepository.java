package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HeartsRepository extends JpaRepository<Hearts,Long> {
    Optional<Hearts> findByUsersAndPosts(Users users, Posts posts);

    List<Hearts> findByPosts(Posts posts);
}

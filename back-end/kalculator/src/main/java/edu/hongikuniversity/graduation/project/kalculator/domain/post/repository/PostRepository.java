package edu.hongikuniversity.graduation.project.kalculator.domain.post.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
}

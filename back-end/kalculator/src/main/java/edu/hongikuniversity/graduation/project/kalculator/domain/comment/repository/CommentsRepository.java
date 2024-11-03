package edu.hongikuniversity.graduation.project.kalculator.domain.comment.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments,Long> {
    List<Comments> findByPosts(Posts posts);
}

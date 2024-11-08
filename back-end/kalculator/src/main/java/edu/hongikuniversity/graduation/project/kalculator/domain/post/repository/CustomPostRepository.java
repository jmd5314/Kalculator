package edu.hongikuniversity.graduation.project.kalculator.domain.post.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;

import java.util.List;

public interface CustomPostRepository {
    List<Post> findPosts(Long page, Long size);
}

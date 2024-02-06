package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;

public interface CustomPostsRepository {
    void updateCount(Posts posts,boolean b);
}

package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomPostsRepositoryImpl implements CustomPostsRepository {
    private final EntityManager em;

    @Override
    public void updateCount(Posts posts, boolean b) {
        if (b) {
            em.createQuery("UPDATE Posts p SET p.likeCount = p.likeCount + 1 WHERE p = :posts")
                    .setParameter("posts", posts)
                    .executeUpdate();
        } else {
            em.createQuery("UPDATE Posts p SET p.likeCount = p.likeCount - 1 WHERE p = :posts")
                    .setParameter("posts", posts)
                    .executeUpdate();
        }
    }
}

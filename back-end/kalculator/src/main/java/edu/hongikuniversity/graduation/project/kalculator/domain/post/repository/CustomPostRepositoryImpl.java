package edu.hongikuniversity.graduation.project.kalculator.domain.post.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.QPost.post;
import static edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.QProfile.profile;
import static edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.QUser.user;

@RequiredArgsConstructor
public class CustomPostRepositoryImpl implements CustomPostRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Post> findPosts(Long page, Long size) {
        return queryFactory
                .select(post)
                .join(post.user, user).fetchJoin()
                .leftJoin(user.profile,profile)
                .orderBy(post.createdAt.desc())
                .offset(page * size)
                .limit(size)
                .fetch();
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.heart.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller.dto.request.HeartInsertRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller.dto.response.HeartIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Heart;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.exception.HeartExistException;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.repository.HeartRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.exception.PostNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;
import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUserId;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HeartService {
    private final HeartRepository heartRepository;
    private final PostRepository postRepository;

    @Transactional
    public HeartIdResponse insert(HeartInsertRequest request) {
        heartRepository.findByUserIdAndPostId(getCurrentUserId(), request.postId())
                .ifPresent(heart -> {
                    throw new HeartExistException(heart.getId());
                });

        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new PostNotFoundException(request.postId()));

        Heart heart = Heart.builder()
                .user(getCurrentUser())
                .post(post)
                .build();

        return HeartIdResponse.from(heartRepository.save(heart));
    }

    @Transactional
    public void delete(Long postId) {
        heartRepository.deleteByUserIdAndPostId(getCurrentUserId(), postId);
    }


}

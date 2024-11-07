package edu.hongikuniversity.graduation.project.kalculator.domain.post.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostBriefResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.exception.PostNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public PostIdResponse create(PostCreateRequest request) {
        Post post = Post.builder()
                .title(request.title())
                .content(request.content())
                .build();
        return PostIdResponse.from(postRepository.save(post));

    }

    @Transactional
    public PostIdResponse update(PostUpdateRequest request) {
        Post post = postRepository.findById(request.id())
                .orElseThrow(() -> new PostNotFoundException(request.id()));

        post.update(
                request.title(),
                request.content());

        return PostIdResponse.from(post);
    }

    public PostDetailsResponse findById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        return PostDetailsResponse.from(post);
    }

    @Transactional
    public void delete(Long id) {
        postRepository.deleteById(id);
    }


    public List<PostBriefResponse> findAll() {
        return null;
    }
}

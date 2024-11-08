package edu.hongikuniversity.graduation.project.kalculator.domain.post.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostBriefResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.exception.PostNotAuthorizationException;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.exception.PostNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

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
                .user(getCurrentUser())
                .build();

        return PostIdResponse.from(postRepository.save(post));

    }

    @Transactional
    public PostIdResponse update(PostUpdateRequest request) {
        Post post = postRepository.findById(request.id())
                .orElseThrow(() -> new PostNotFoundException(request.id()));

        validateUser(post);
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
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        validateUser(post);
        postRepository.deleteById(id);
    }


    public List<PostBriefResponse> getList(Long page,Long size) {
        List<Post> posts = postRepository.findPosts(page, size);
        return posts.stream()
                .map(PostBriefResponse::from)
                .toList();
    }

    private void validateUser(Post post){
        if (!post.getUser().equals(getCurrentUser())) {
            throw new PostNotAuthorizationException(post.getId());
        }
    }
}

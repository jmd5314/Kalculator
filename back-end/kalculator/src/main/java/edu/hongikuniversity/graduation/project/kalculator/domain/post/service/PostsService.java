package edu.hongikuniversity.graduation.project.kalculator.domain.post.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.entity.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.repository.CommentsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.repository.HeartsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostsService {
    private final PostsRepository postsRepository;
    private final HeartsRepository heartsRepository;
    private final CommentsRepository commentsRepository;
    @Transactional
    public Long save(Post posts){
        return postsRepository.save(posts).getPostId();
    }
    public Post findById(Long id){
        return postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
    }

    public List<Post> findAll() {
        return postsRepository.findAll();
    }
    @Transactional
    public void deletePosts(Long postId) {
        Post posts = postsRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        List<Hearts> heartsList = heartsRepository.findByPosts(posts);
        // 해당 게시물의 모든 좋아요 제거
        for(Hearts hearts:heartsList){
            heartsRepository.delete(hearts);
        }
        List<Comment> commentsList = commentsRepository.findByPosts(posts);
        // 해당 게시물의 모든 댓글 제거
        for(Comment comments:commentsList){
            commentsRepository.delete(comments);
        }
        postsRepository.delete(posts);
    }
    @Transactional
    public Post updatePosts(Long postId, PostsRequestDto requestDto) {
        Post posts = postsRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        posts.update(requestDto.getTitle(), requestDto.getContent());
        return postsRepository.save(posts);
    }
}

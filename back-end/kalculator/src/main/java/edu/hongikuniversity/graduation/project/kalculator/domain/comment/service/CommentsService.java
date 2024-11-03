package edu.hongikuniversity.graduation.project.kalculator.domain.comment.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.repository.CommentsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostsRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final UsersRepository usersRepository;
    private final PostsRepository postsRepository;
    @Transactional
    public Long save(CommentsSaveRequestDto requestDto,String userId){
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()->new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        Posts posts = postsRepository.findById(requestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        Comments comments = Comments.builder().content(requestDto.getContent())
                .creationDate(LocalDate.now()).users(users).posts(posts).build();
        return commentsRepository.save(comments).getCommentId();
    }

    public List<Comments> findByPostId(Long postId) {
        Posts posts = postsRepository.findById(postId).orElseThrow(()->new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        List<Comments> comments = commentsRepository.findByPosts(posts);
        return comments;
    }
    @Transactional
    public Comments updateComments(Long commentId, String content) {
        Comments comments = commentsRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));
        comments.setContent(content);
        return commentsRepository.save(comments);
    }
    @Transactional
    public void deleteComments(Long commentId) {
        Comments comments = commentsRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));
        commentsRepository.delete(comments);
    }
}

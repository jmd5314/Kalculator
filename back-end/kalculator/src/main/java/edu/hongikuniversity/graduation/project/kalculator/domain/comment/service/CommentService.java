package edu.hongikuniversity.graduation.project.kalculator.domain.comment.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response.CommentIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.exception.CommentNotAuthorizationException;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.exception.CommentNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.repository.CommentRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.exception.PostNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.repository.PostRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public CommentIdResponse create(CommentCreateRequest request) {
        User user = getCurrentUser();
        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new PostNotFoundException(request.postId()));
        Comment comment = Comment
                .builder()
                .user(user)
                .post(post)
                .content(request.content())
                .build();
        return CommentIdResponse.from(commentRepository.save(comment));
    }


    @Transactional
    public CommentIdResponse update(CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(request.id())
                .orElseThrow(() -> new CommentNotFoundException(request.id()));

        validateUser(comment);

        comment.updateContent(request.content());
        return CommentIdResponse.from(comment);
    }

    @Transactional
    public void delete(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException(id));

        validateUser(comment);

        commentRepository.deleteById(id);
    }

    private void validateUser(Comment comment) {
        if (!comment.getUser().equals(getCurrentUser())) {
            throw new CommentNotAuthorizationException(comment.getId());
        }
    }
}

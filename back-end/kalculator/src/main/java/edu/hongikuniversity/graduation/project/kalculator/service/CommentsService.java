package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.repository.CommentsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.PostsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final UsersRepository usersRepository;
    private final PostsRepository postsRepository;
    @Transactional
    public Long save(CommentsSaveRequestDto requestDto){
        Users users = usersRepository.findByUserId(requestDto.getUserId())
                .orElseThrow(()->new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        Posts posts = postsRepository.findById(requestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        Comments comments = Comments.builder().content(requestDto.getContent())
                .creationDate(requestDto.getCreationDate()).users(users).posts(posts).build();
        return commentsRepository.save(comments).getCommentId();
    }

}

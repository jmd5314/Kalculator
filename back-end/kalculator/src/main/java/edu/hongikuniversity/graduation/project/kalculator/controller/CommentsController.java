package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.CommentsService;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentsController {
    private final CommentsService commentsService;
    private final PostsService postsService;
    @PostMapping("/save")
    public Long save(@RequestBody CommentsSaveRequestDto requestDto, Authentication authentication){
        String userId = authentication.getName();
        return commentsService.save(requestDto, userId);
    }
    @GetMapping("/list")
    @ResponseBody
    public List<CommentsResponseDto> commentsList(@RequestParam Long postId){
        List<CommentsResponseDto> responseDtoList = new ArrayList<>();
        List<Comments> commentsList = commentsService.findByPostId(postId);
        // 댓글 수정을 하면 순서가 바뀌기 때문에 댓글 순서대로 리스트 정렬 후 Dto 에 추가
        Collections.sort(commentsList, Comparator.comparingLong(Comments::getCommentId));
        for(Comments comments:commentsList){
            responseDtoList.add(new CommentsResponseDto(comments));
        }
        return responseDtoList;
    }
    @PutMapping("/update/{commentId}")
    public Long update(@PathVariable Long commentId,@RequestBody CommentsUpdateRequestDto requestDto){
        return commentsService.updateComments(commentId, requestDto.getContent()).getCommentId();
    }
}

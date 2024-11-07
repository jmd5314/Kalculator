package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response.CommentResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentsUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.service.CommentsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    private final PostService postsService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody CommentsSaveRequestDto requestDto, Authentication authentication){
        // 내용이 비어있는 경우 에러처리
        if(requestDto.getContent()==null||requestDto.getContent().isEmpty()){
            return ResponseEntity.badRequest().body("내용이 비어 있습니다.");
        }
        String userId = authentication.getName();
        Long commentId = commentsService.save(requestDto, userId);
        return ResponseEntity.ok(commentId);
    }
    @GetMapping("/list")
    @ResponseBody
    public List<CommentResponseDto> commentsList(@RequestParam Long postId){
        List<CommentResponseDto> responseDtoList = new ArrayList<>();
        List<Comment> commentsList = commentsService.findByPostId(postId);
        // 댓글 수정을 하면 순서가 바뀌기 때문에 댓글 순서대로 리스트 정렬 후 Dto 에 추가
        Collections.sort(commentsList, Comparator.comparingLong(Comment::getCommentId));
        for(Comment comments:commentsList){
            responseDtoList.add(new CommentResponseDto(comments));
        }
        return responseDtoList;
    }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<?> update(@PathVariable Long commentId,@RequestBody CommentsUpdateRequestDto requestDto){
        if (requestDto.getContent()==null||requestDto.getContent().isEmpty()){
            return ResponseEntity.badRequest().body("내용이 비어 있습니다.");
        }

        return ResponseEntity.ok(commentsService.updateComments(commentId, requestDto.getContent()).getCommentId());
    }
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> delete(@PathVariable Long commentId){
        commentsService.deleteComments(commentId);
        return ResponseEntity.ok().body("해당 댓글을 삭제하였습니다.");
    }
}

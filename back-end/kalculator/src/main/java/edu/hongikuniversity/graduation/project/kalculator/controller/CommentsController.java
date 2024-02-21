package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsCountRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.HeartsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.CommentsService;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentsController {
    private final CommentsService commentsService;
    private final PostsService postsService;
    @PostMapping("/save")
    public Long save(@RequestBody CommentsSaveRequestDto requestDto){
        return commentsService.save(requestDto);
    }
    @GetMapping("/count")
    @ResponseBody
    public Integer count(@RequestBody CommentsCountRequestDto requestDto){
        Posts posts = postsService.findById(requestDto.getPostId());
        return posts.getComments().size();
    }
    @GetMapping("/list")
    @ResponseBody
    public List<CommentsResponseDto> commentsList(){
        List<CommentsResponseDto> responseDtoList = new ArrayList<>();
        List<Comments> commentsList = commentsService.findAll();
        for(Comments comments:commentsList){
            responseDtoList.add(new CommentsResponseDto(comments));
        }
        return responseDtoList;
    }
}

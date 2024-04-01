package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.HeartsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.HeartsService;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hearts")
public class HeartsController {
    private final HeartsService heartsService;
    private final PostsService postsService;
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody HeartsRequestDto requestDto, Authentication authentication) {
        Long postId = requestDto.getPostId();
        String userId = authentication.getName();
        heartsService.insert(postId,userId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam Long postId,Authentication authentication) {
        String userId = authentication.getName();
        heartsService.delete(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @GetMapping("/count")
    @ResponseBody
    public Integer count(@RequestParam Long postId){
        Posts posts = postsService.findById(postId);
        return posts.getLikeCount();
    }
}

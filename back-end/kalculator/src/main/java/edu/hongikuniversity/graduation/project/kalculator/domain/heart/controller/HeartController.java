package edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.service.HeartsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hearts")
public class HeartController {
    private final HeartsService heartsService;
    private final PostService postsService;
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody HeartsRequestDto requestDto, Authentication authentication) {
        Long postId = requestDto.getPostId();
        String userId = authentication.getName();
        heartsService.insert(postId,userId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> delete(@PathVariable Long postId,Authentication authentication) {
        String userId = authentication.getName();
        heartsService.delete(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @GetMapping("/confirm")
    @ResponseBody
    public ResponseEntity<Boolean> confirm(@RequestParam Long postId,Authentication authentication){
        String userId = authentication.getName();
        boolean confirm = heartsService.confirm(postId, userId);
        return ResponseEntity.ok(confirm);
    }
}

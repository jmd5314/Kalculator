package edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.service.HeartService;
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
    private final HeartService heartService;

    @PostMapping()
    public ResponseEntity<?> insert(@RequestBody HeartInsertRequest request) {
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

}

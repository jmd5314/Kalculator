package edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller.dto.request.HeartInsertRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.controller.dto.response.HeartIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.heart.service.HeartService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heart")
public class HeartController {
    private final HeartService heartService;

    @PostMapping
    public ResponseEntity<ApiResponse<HeartIdResponse>> insert(@RequestBody HeartInsertRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(heartService.insert(request)));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> delete(@PathVariable Long postId) {
        heartService.delete(postId);
        return ResponseEntity.noContent().build();
    }
}

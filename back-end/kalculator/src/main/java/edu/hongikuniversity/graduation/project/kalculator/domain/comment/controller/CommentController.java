package edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.request.CommentUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.controller.dto.response.CommentIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.comment.service.CommentService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comment")
public class CommentController {
    private final CommentService commentsService;

    @PostMapping
    public ResponseEntity<ApiResponse<CommentIdResponse>> create(@Valid @RequestBody CommentCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(commentsService.create(request)));
    }


    @PutMapping
    public ResponseEntity<ApiResponse<CommentIdResponse>> update(@RequestBody CommentUpdateRequest request) {
        return ResponseEntity.ok().body(ApiResponse.success(commentsService.update(request)));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentsService.delete(id);
        return ResponseEntity.noContent().build();
    }

}

package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.CommentsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.service.CommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentsController {
    private final CommentsService commentsService;
    @PostMapping("/save")
    public Long save(@RequestBody CommentsRequestDto requestDto){
        return commentsService.save(requestDto);
    }

}

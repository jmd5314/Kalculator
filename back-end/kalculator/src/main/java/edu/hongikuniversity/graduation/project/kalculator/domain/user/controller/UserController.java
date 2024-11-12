package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserSignUpRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserUpdateWeightRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserCurrentWeightResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UserService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse<UserIdResponse>> signUp(@Valid @RequestBody UserSignUpRequest request) {
        return ResponseEntity.ok().body(success(userService.signUp(request)));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<UserCurrentWeightResponse>> updateCurrentWeight(@RequestBody UserUpdateWeightRequest request) {
        return ResponseEntity.ok().body(success(userService.updateCurrentWeight(request)));
    }



}

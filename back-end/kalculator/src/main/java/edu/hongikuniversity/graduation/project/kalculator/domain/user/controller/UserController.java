package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserSignUpRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UserService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse<UserIdResponse>> signUp(@Valid @RequestBody UserSignUpRequest request) {
        return ResponseEntity.ok().body(ApiResponse.success(userService.signUp(request)));
    }

}

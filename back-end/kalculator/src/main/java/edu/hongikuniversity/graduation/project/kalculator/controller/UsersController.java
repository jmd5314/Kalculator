package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.dto.LoginResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.UsersJoinRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.UsersLoginRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UsersController {
    private final UsersService usersService;
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UsersJoinRequestDto requestDto){
        usersService.join(requestDto.getUserId(), requestDto.getPassword(), requestDto.getName(), requestDto.getEmail());
        return ResponseEntity.ok().body("회원가입이 성공 했습니다.");
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody UsersLoginRequestDto  requestDto){
        String token = usersService.login(requestDto.getUserId(), requestDto.getPassword());
        boolean profileCreated;
        if(usersService.findByUserId(requestDto.getUserId()).getProfiles()!=null)
            profileCreated = true;
        else
            profileCreated = false;
        LoginResponseDto responseDto = new LoginResponseDto(token, profileCreated);
        return ResponseEntity.ok().body(responseDto);
    }
}

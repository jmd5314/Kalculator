package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.dto.LoginResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.UsersAccountRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.UsersJoinRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UsersController {
    private final UsersService usersService;
    //회원가입
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UsersJoinRequestDto requestDto){
        usersService.join(requestDto.getUserId(), requestDto.getPassword(), requestDto.getName(), requestDto.getEmail());
        return ResponseEntity.ok().body("회원가입이 성공 했습니다.");
    }
    //로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody UsersAccountRequestDto requestDto){
        String token = usersService.login(requestDto.getUserId(), requestDto.getPassword());
        boolean profileCreated;
        if(usersService.findByUserId(requestDto.getUserId()).getProfiles()!=null)
            profileCreated = true;
        else
            profileCreated = false;
        LoginResponseDto responseDto = new LoginResponseDto(token, profileCreated);
        return ResponseEntity.ok().body(responseDto);
    }
    //회원탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody UsersAccountRequestDto requestDto){
        usersService.delete(requestDto.getUserId(),requestDto.getPassword());
        return ResponseEntity.ok().body(("회원탈퇴가 완료되었습니다."));
    }
}

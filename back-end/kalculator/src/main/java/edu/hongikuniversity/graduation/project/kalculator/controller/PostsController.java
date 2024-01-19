package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostsController {
    private final UsersService usersService;
    private final PostsService postsService;
    @PostMapping("/save")
    public Long save(@RequestBody PostsRequestDto requestDto, Authentication authentication
    ){
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Posts posts = Posts.builder().title(requestDto.getTitle()).content(requestDto.getContent())
                .creationDate(requestDto.getCreationDate()).build();
        posts.setUsers(users);
        return postsService.save(posts);
    }
    @GetMapping("/list")
    @ResponseBody
    public List<PostsResponseDto> postsList(){
        List<PostsResponseDto> responseDtoList = new ArrayList<>();
        List<Posts> postsList = postsService.findAll();
        for(Posts posts:postsList){
            responseDtoList.add(new PostsResponseDto(posts));
        }
        return responseDtoList;
    }
}

package edu.hongikuniversity.graduation.project.kalculator.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

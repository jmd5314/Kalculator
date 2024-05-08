package edu.hongikuniversity.graduation.project.kalculator.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.service.PostsService;
import edu.hongikuniversity.graduation.project.kalculator.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostsController {
    private final UsersService usersService;
    private final PostsService postsService;
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody PostsSaveRequestDto requestDto, Authentication authentication
    ){
        if(requestDto.getContent()==null||requestDto.getContent().isEmpty()){
            return ResponseEntity.badRequest().body("내용이 비어 있습니다.");
        }
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Posts posts = Posts.builder().title(requestDto.getTitle()).content(requestDto.getContent())
                .creationDate(requestDto.getCreationDate()).build();
        posts.setUsers(users);
        return ResponseEntity.ok(postsService.save(posts));
    }
    @GetMapping("confirm")
    @ResponseBody
    public PostsResponseDto confirm(@RequestParam Long postId){
        Posts posts = postsService.findById(postId);
        PostsResponseDto responseDto = new PostsResponseDto(posts);
        return responseDto;
    }
    @GetMapping("/list")
    @ResponseBody
    public List<PostsResponseDto> postsList(){
        List<PostsResponseDto> responseDtoList = new ArrayList<>();
        List<Posts> postsList = postsService.findAll();
        // 가장 최신의 게시물이 최상단에 뜨도록 내림차순 정렬
        Collections.sort(postsList, Comparator.comparingLong(Posts::getPostId).reversed());
        for(Posts posts:postsList){
            responseDtoList.add(new PostsResponseDto(posts));
        }
        return responseDtoList;
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> delete(@PathVariable Long postId){
        postsService.deletePosts(postId);
        return ResponseEntity.ok().body("해당 게시물이 성공적으로 삭제되었습니다.");
    }
    @PutMapping("/update/{postId}")
    public ResponseEntity<?> update(@PathVariable Long postId, @RequestBody PostsUpdateRequestDto requestDto){
        return ResponseEntity.ok(postsService.updatePosts(postId, requestDto).getPostId());
    }
}

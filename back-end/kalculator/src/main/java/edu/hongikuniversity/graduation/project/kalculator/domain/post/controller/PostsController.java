package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.service.PostsService;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public ResponseEntity<?> save(@RequestBody PostsRequestDto requestDto, Authentication authentication
    ){
        if(requestDto.getContent()==null||requestDto.getContent().isEmpty()){
            return ResponseEntity.badRequest().body("내용이 비어 있습니다.");
        }
        String userId = authentication.getName();
        Users users = usersService.findByUserId(userId);
        Post posts = Post.builder().title(requestDto.getTitle()).content(requestDto.getContent())
                .creationDate(LocalDate.now()).build();
        posts.setUsers(users);
        return ResponseEntity.ok(postsService.save(posts));
    }
    @GetMapping("confirm")
    @ResponseBody
    public PostsResponseDto confirm(@RequestParam Long postId){
        Post posts = postsService.findById(postId);
        PostsResponseDto responseDto = new PostsResponseDto(posts);
        return responseDto;
    }
    @GetMapping("/list")
    @ResponseBody
    public List<PostsResponseDto> postsList(){
        List<PostsResponseDto> responseDtoList = new ArrayList<>();
        List<Post> postsList = postsService.findAll();
        // 가장 최신의 게시물이 최상단에 뜨도록 내림차순 정렬
        Collections.sort(postsList, Comparator.comparingLong(Post::getPostId).reversed());
        for(Post posts:postsList){
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
    public ResponseEntity<?> update(@PathVariable Long postId, @RequestBody PostsRequestDto requestDto){
        return ResponseEntity.ok(postsService.updatePosts(postId, requestDto).getPostId());
    }
}

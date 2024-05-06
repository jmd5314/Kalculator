package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.repository.CustomPostsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.HeartsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.PostsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeartsService {

    private final HeartsRepository heartsRepository;
    private final UsersRepository usersRepository;
    private final PostsRepository postsRepository;
    @Transactional
    public void insert (Long postId,String userId){
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()->new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        Posts posts = postsRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾울 수 없습니다"));
        // 이미 좋아요 되어있으면 오류 반환
        if(heartsRepository.findByUsersAndPosts(users,posts).isPresent()){
            throw new IllegalArgumentException("좋아요 중복 에러");
        }
        Hearts hearts = Hearts.builder()
                .users(users)
                .posts(posts).build();
        heartsRepository.save(hearts);
    }
    @Transactional
    public void delete(Long postId,String userId){
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()->new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        Posts posts = postsRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾울 수 없습니다."));
        Hearts hearts = heartsRepository.findByUsersAndPosts(users, posts)
                .orElseThrow(() -> new IllegalArgumentException("해당 좋아요를 찾을 수 없습니다."));
        heartsRepository.delete(hearts);
    }
    public boolean confirm(Long postId,String userId){
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()->new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        Posts posts = postsRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾울 수 없습니다."));
        if(heartsRepository.findByUsersAndPosts(users,posts).isPresent())
            return true;
        else
            return false;
    }
}

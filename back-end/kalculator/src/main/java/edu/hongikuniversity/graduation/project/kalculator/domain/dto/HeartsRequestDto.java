package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HeartsRequestDto {
    private String userId;
    private Long postId;
    public HeartsRequestDto(String userId,Long postId){
        this.userId = userId;
        this.postId = postId;
    }
}

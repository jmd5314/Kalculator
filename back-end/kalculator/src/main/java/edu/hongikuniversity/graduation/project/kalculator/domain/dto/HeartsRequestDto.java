package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HeartsRequestDto {
    private Long postId;
    public HeartsRequestDto(String userId,Long postId){
        this.postId = postId;
    }
}

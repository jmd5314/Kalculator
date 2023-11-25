package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.ProfilesRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesSaveRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfilesService {
    private final ProfilesRepository profilesRepository;

    // 프로필 생성
    @Transactional
    public Long save(ProfilesSaveRequestDto requestDto){
        return profilesRepository.save(requestDto.toEntity()).getProfileId();
    }
    //프로필 수정
    @Transactional
    public Long update(Long id, ProfilesUpdateRequestDto requestDto){
        Profiles profiles = profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException("프로필 수정 오류"));
        profiles.updateProfiles(requestDto.getTargetWeight(),requestDto.getAge(),requestDto.getGender(),requestDto.getHeight()
        ,requestDto.getWeight(),requestDto.getActivityLevel(),requestDto.getPurposeOfUse(),requestDto.getDietMode());
        return id;
    }
    public ProfilesResponseDto findById(Long id){
        Profiles entity = profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException("프로필 확인 오류"+
                "id = "+id));
        return new ProfilesResponseDto(entity);
    }

}

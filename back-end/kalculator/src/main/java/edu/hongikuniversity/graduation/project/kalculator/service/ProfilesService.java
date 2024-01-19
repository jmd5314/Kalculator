package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.repository.ProfilesRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.ProfilesUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfilesService {
    private final ProfilesRepository profilesRepository;

 //프로필 생성
    @Transactional
    public Long save(Profiles profiles){
        return profilesRepository.save(profiles).getProfileId();
    }
    //프로필 수정
    @Transactional
    public Long update(Long id, ProfilesUpdateRequestDto requestDto){
        Profiles profiles = profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException("프로필 수정 오류"));
        profiles.updateProfiles(requestDto.toEntity());
        return id;
    }

    public Profiles findById(Long id) {
        return profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException(id+"의 프로필이 존재하지 않습니다"));
    }
}


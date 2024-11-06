package edu.hongikuniversity.graduation.project.kalculator.domain.profile.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfilesUpdateRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.repository.ProfilesRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UserRepository;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfilesService {
    private final ProfilesRepository profilesRepository;
    private final UserRepository userRepository;

    //프로필 생성
    @Transactional
    public ProfileIdResponse save(ProfileCreateRequest request) {
        User user = getCurrentUser();

        Profile profile = Profile.builder()
                .nickname(request.nickname())
                .targetWeight(request.targetWeight())
                .age(request.age())
                .gender(request.gender())
                .height(request.height())
                .weight(request.weight())
                .activityLevel(request.activityLevel())
                .purposeOfUse(request.purposeOfUse())
                .dietMode(request.dietMode())
                .user(user)
                .build();

        return ProfileIdResponse.from(profilesRepository.save(profile));
    }

    //프로필 수정
    @Transactional
    public Long update(Long id, ProfilesUpdateRequestDto requestDto){
        Profile profiles = profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException("프로필 수정 오류"));
        profiles.updateProfiles(requestDto.toEntity());
        return id;
    }

    public Profile findById(Long id) {
        return profilesRepository.findById(id).orElseThrow(()->new IllegalArgumentException(id+"의 프로필이 존재하지 않습니다"));
    }

    private User getCurrentUser(){
        return userRepository.findByUsername(SecurityUtil.getCurrentUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 존재하지 않습니다"));
    }
}


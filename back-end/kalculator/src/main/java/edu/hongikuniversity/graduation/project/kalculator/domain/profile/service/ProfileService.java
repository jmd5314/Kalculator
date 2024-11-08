package edu.hongikuniversity.graduation.project.kalculator.domain.profile.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.request.ProfileUpdateWeightRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileCurrentWeightResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.controller.dto.response.ProfileIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.entity.Profile;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.exception.ProfileNotFoundException;
import edu.hongikuniversity.graduation.project.kalculator.domain.profile.repository.ProfileRepository;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;

    //프로필 생성
    @Transactional
    public ProfileIdResponse create(ProfileRequest request) {
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

        return ProfileIdResponse.from(profileRepository.save(profile));
    }

    public ProfileDetailsResponse confirm() {
        Profile profile = profileRepository.findByUser(getCurrentUser())
                .orElseThrow(ProfileNotFoundException::new);

        return ProfileDetailsResponse.from(profile);
    }

    //프로필 수정
    @Transactional
    public ProfileIdResponse update(ProfileRequest request) {
        Profile profile = findByUser();
        profile.updateProfile(
                request.nickname(),
                request.targetWeight(),
                request.age(),
                request.gender(),
                request.height(),
                request.weight(),
                request.activityLevel(),
                request.purposeOfUse(),
                request.dietMode()
        );
        return ProfileIdResponse.from(profile);
    }

    @Transactional
    public ProfileCurrentWeightResponse updateCurrentWeight(ProfileUpdateWeightRequest request) {
        Profile profile = findByUser();
        profile.updateCurrentWeight(request.currentWeight());

        return ProfileCurrentWeightResponse.from(profile);
    }


    private Profile findByUser(){
        return profileRepository.findByUser(getCurrentUser())
                .orElseThrow(ProfileNotFoundException::new);
    }

}


package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Profiles;
import edu.hongikuniversity.graduation.project.kalculator.domain.ProfilesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfilesService {
    private final ProfilesRepository profilesRepository;

    // 프로필 생성
    @Transactional
    public Long save(Profiles profiles){
        profilesRepository.save(profiles);
        return profiles.getProfileId();
    }
    //프로필 수정
}

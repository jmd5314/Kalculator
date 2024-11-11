package edu.hongikuniversity.graduation.project.kalculator.domain.user.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserLoginRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserUpdateWeightRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserCurrentWeightResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request.UserSignUpRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.response.UserLoginResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.Role;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.exception.UserEmailDuplicateException;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.exception.UsernameDuplicateException;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static edu.hongikuniversity.graduation.project.kalculator.global.auth.util.SecurityUtil.getCurrentUser;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserIdResponse signUp(UserSignUpRequest request) {

        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new UsernameDuplicateException(request.username());
        }

        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserEmailDuplicateException(request.email());
        }

        User user = User.builder()
                .username(request.username())
                .password(request.password())
                .name(request.name())
                .email(request.email())
                .role(Role.USER)
                .build();
        user.passwordEncode(passwordEncoder);
        userRepository.save(user);

        return UserIdResponse.from(user);
    }

    @Transactional
    public UserLoginResponse login(UserLoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 존재하지 않습니다."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다");
        }

        return UserLoginResponse.from(user);
    }

    @Transactional
    public UserCurrentWeightResponse updateCurrentWeight(UserUpdateWeightRequest request) {
        getCurrentUser().updateCurrentWeight(request.currentWeight());
        return UserCurrentWeightResponse.from(getCurrentUser());
    }

}



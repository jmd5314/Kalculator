package edu.hongikuniversity.graduation.project.kalculator.service;
import edu.hongikuniversity.graduation.project.kalculator.domain.Users;
import edu.hongikuniversity.graduation.project.kalculator.domain.UsersRepository;
import edu.hongikuniversity.graduation.project.kalculator.exception.AppException;
import edu.hongikuniversity.graduation.project.kalculator.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder encoder;
    public String join (String userId,String password,String name,String email){
        //name 중복 check
        usersRepository.findByUserId(userId)
                .ifPresent(users -> {
                    throw new AppException(ErrorCode.USERID_DUPLICATED,userId+"는 이미 있습니다.");
                });
        //email 중복 check
        usersRepository.findByEmail(email)
                .ifPresent(users -> {
                    throw new AppException(ErrorCode.EMAIL_DUPLICATED,email+"는 이미 있습니다.");
                });
        //저장
        Users user = Users.builder().
                userId(userId)
                .password(encoder.encode(password))
                .name(name)
                .email(email).build();
        usersRepository.save(user);
        return "SUCCESS";
    }
}

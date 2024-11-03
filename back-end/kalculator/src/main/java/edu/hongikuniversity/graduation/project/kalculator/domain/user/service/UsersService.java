package edu.hongikuniversity.graduation.project.kalculator.domain.user.service;
import edu.hongikuniversity.graduation.project.kalculator.domain.user.repository.UsersRepository;
import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;
import edu.hongikuniversity.graduation.project.kalculator.global.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder encoder;
    @Value("${jwt.token.secret}")
    private String secretKey;
    private Long expireTimeMs = 1000*60*60l;
    public void join (String userId,String password,String name,String email){
        //name 중복 check
        usersRepository.findByUserId(userId)
                .ifPresent(users -> {
                    throw new AppException(ErrorCode.USERID_DUPLICATED,userId+"는 이미 있습니다.");
                });
        //email 중복 check
        usersRepository.findByEmail(email)
                .ifPresent(users -> {
                    throw new AppException(ErrorCode.USER_EMAIL_DUPLICATED,email+"는 이미 있습니다.");
                });
        //저장
        Users user = Users.builder().
                userId(userId)
                .password(encoder.encode(password))
                .name(name)
                .email(email).build();
        usersRepository.save(user);
    }

    public String login(String userId,String password) {
        //userId 없음
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()->new AppException(ErrorCode.USERID_NOT_FOUND,userId+"이 없습니다"));
        //password 틀림
        if(!encoder.matches(password,users.getPassword())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "패스워드가 잘못 입력됐습니다.");
        }
        //Exception 없으면 token 발행
        return JwtTokenUtil.createToken(userId,secretKey,expireTimeMs);
    }
    public Users findByUserId(String userId){
        return usersRepository.findByUserId(userId).
                orElseThrow(()->new AppException(ErrorCode.USERID_NOT_FOUND,userId+"이 없습니다."));
    }
    public void delete(String userId,String password){
        //userId 확인
        Users users = usersRepository.findByUserId(userId)
                .orElseThrow(()-> new AppException(ErrorCode.USERID_NOT_FOUND,userId+"이 없습니다"));
        //password 확인
        if(!encoder.matches(password,users.getPassword())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "패스워드가 잘못입력됐습니다.");
        }
        usersRepository.delete(users);
    }
}

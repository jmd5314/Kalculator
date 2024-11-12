package edu.hongikuniversity.graduation.project.kalculator.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT, "username : '%s' 가 이미 존재합니다."),
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "email : '%s 가 이미 존재합니다."),

    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND,"토큰이 존재 하지 않습니다"),
    TOKEN_NOT_VALID(HttpStatus.FORBIDDEN, "토큰이 유효하지 않습니다"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다"),

    PROFILE_NOT_FOUND(HttpStatus.NOT_FOUND, "프로필이 존재하지 않습니다"),

    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "게시물 id : %s 가 존재하지 않습니다"),
    POST_NOT_AUTHORIZE(HttpStatus.FORBIDDEN, "게시물 id :%s 에 대한 권한지 존재하지 않습니다"),

    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "댓글 id : %s 가 존재하지 않습니다"),
    COMMENT_NOT_AUTHORIZE(HttpStatus.FORBIDDEN, "댓글 id : %s 에 대한 권한이 존재하지 않습니다"),

    HEART_ALREADY_EXIST(HttpStatus.CONFLICT, "좋아요 id : %s 가 이미 존재합니다"),

    GROUP_ALREADY_FULL(HttpStatus.CONFLICT, "그룹에 인원이 다 찼습니다"),
    GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "그룹 id : %s 가 존재하지 않습니다"),

    MEMBERSHIP_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 그룹에 가입되어 있습니다"),;
    private final HttpStatus httpStatus;
    private final String messageTemplate;
}

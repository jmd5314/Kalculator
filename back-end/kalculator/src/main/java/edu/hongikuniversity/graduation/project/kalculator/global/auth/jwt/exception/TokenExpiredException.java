package edu.hongikuniversity.graduation.project.kalculator.global.auth.jwt.exception;

import edu.hongikuniversity.graduation.project.kalculator.global.error.AppException;
import edu.hongikuniversity.graduation.project.kalculator.global.error.ErrorCode;

import static io.lettuce.core.pubsub.PubSubOutput.Type.message;

public class TokenExpiredException extends AppException {
    public TokenExpiredException() {
        super(ErrorCode.TOKEN_EXPIRED);
    }
}

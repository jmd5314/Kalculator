package edu.hongikuniversity.graduation.project.kalculator.global.error;

import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiResponse<Void>> handleException(final Exception e) {
        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                e.getMessage()
        );

    }

    /**
     * Application 내의 Exception 들 핸들링
     */

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
        return buildErrorResponse(
                e.getErrorCode().getHttpStatus(),
                e.getErrorCode().getMessageTemplate());
    }

    /**
     * @Valid 검증 오류 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(
            final MethodArgumentNotValidException e
    ) {
        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                e.getMessage());
    }

    private ResponseEntity<ApiResponse<Void>> buildErrorResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(ApiResponse.error(message));
    }
}
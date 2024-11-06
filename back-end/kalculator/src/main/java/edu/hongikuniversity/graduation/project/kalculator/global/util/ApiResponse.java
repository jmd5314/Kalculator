package edu.hongikuniversity.graduation.project.kalculator.global.util;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ApiResponse<T> {
    private String message;
    private T result;

    public static ApiResponse<Void> error(String message){
        return new ApiResponse<>(message, null);
    }

    public static <T> ApiResponse<T> success(T result){
        return new ApiResponse<>("Success", result);
    }
}
package edu.hongikuniversity.graduation.project.kalculator.domain.user.controller.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserSignUpRequest(

        @NotBlank(message = "아이디는 필수 입력 값입니다.")
        @Size(min = 5, max = 20, message = "아이디는 5자 이상, 20자 이하여야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "아이디는 영문과 숫자만 사용할 수 있습니다.")
        String username,

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*(),.?\":{}|<>]*$", message = "비밀번호는 영문과 숫자를 포함해야 합니다.")
        String password,

        @NotBlank(message = "이메일은 필수 입력 값입니다.")
        @Email(message = "유효하지 않은 이메일 형식입니다.")
        String email,

        @NotBlank(message = "이름은 필수 입력 값입니다.")
        @Size(min = 2, message = "이름은 2자 이상이어야 합니다.")
        String name
) {
}
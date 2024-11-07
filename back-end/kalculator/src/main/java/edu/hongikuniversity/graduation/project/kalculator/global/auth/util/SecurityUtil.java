package edu.hongikuniversity.graduation.project.kalculator.global.auth.util;

import edu.hongikuniversity.graduation.project.kalculator.domain.user.entity.User;
import edu.hongikuniversity.graduation.project.kalculator.global.auth.model.CustomUserDetails;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class SecurityUtil {

    public static User getCurrentUser() {
        return getUserDetails().getUser();
    }

    public static Long getCurrentUserId() {
        return getUserDetails().getId();
    }

    private static CustomUserDetails getUserDetails(){
        return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
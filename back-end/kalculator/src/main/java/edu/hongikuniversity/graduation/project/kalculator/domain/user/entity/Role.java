package edu.hongikuniversity.graduation.project.kalculator.domain.user.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    GUEST("Role_GUEST"),
    USER("Role_USER");

    private final String key;
}

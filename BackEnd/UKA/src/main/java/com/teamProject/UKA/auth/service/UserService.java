package com.teamProject.UKA.auth.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamProject.UKA.auth.dto.UserNicknameUpdateResponse;
import com.teamProject.UKA.auth.model.User;
import com.teamProject.UKA.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
    
    public UserNicknameUpdateResponse updateNickname(String userId, String newNickname) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + userId));
        user.setNickname(newNickname);
        return new UserNicknameUpdateResponse(user.getUserId(), user.getNickname());
    }
    
    public void changePassword(String userId, String currentPassword, String newPassword) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("현재 비밀번호가 올바르지 않습니다.");
        }
        if (passwordEncoder.matches(newPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("새 비밀번호가 기존과 동일합니다.");
        }
        user.setPasswordHash(passwordEncoder.encode(newPassword));
    }
    
    public void withdrawUser(String userId) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 닉네임 중복 방지: "탈퇴한 회원_" + userId 일부 + 타임스탬프
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMddHHmmss"));
        String newNickname = "탈퇴한 회원_" + userId.substring(Math.max(0, userId.length() - 4)) + "_" + timestamp;

        user.setNickname(newNickname);           // 닉네임 변경
        user.setActive(false);                   // 비활성화
        user.setDeletedAt(LocalDateTime.now());  // 탈퇴 시각
        user.setPasswordHash("");                // 비밀번호 초기화(선택)
        user.setEmail("");                       // 이메일 초기화(선택)
        // 필요시 추가 필드도 초기화
    }
}

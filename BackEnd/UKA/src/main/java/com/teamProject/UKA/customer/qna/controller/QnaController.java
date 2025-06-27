package com.teamProject.UKA.customer.qna.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamProject.UKA.customer.qna.dto.QnaRequestDTO;
import com.teamProject.UKA.customer.qna.dto.QnaResponseDTO;
import com.teamProject.UKA.customer.qna.entity.QnaEntity;
import com.teamProject.UKA.customer.qna.service.QnaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer/qna")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    // 게시글 등록
    @PostMapping
    public ResponseEntity<QnaResponseDTO> createQna(@RequestBody QnaRequestDTO dto) {
        return ResponseEntity.ok(qnaService.createQna(dto));
    }

    // 전체 게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<QnaResponseDTO>> getAllQna() {
        return ResponseEntity.ok(qnaService.getAllQna());
    }

    // 게시글 상세 조회
    @GetMapping("/{no}")
    public ResponseEntity<QnaResponseDTO> getQna(
        @PathVariable("no") Long no,
        @RequestParam(value = "password", required = false) String password
    ) {
        QnaEntity qna = qnaService.findByQnaNo(no)
            .orElseThrow(() -> new RuntimeException("글이 없습니다."));

        if ("Y".equals(qna.getQnaIsSecret())) {
            if (password == null || !password.equals(qna.getQnaPassword())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }

        return ResponseEntity.ok(QnaResponseDTO.fromEntity(qna));
    }

    // 게시글 수정
    @PutMapping("/{no}")
    public ResponseEntity<QnaResponseDTO> updateQna(@PathVariable("no") Long no, @RequestBody QnaRequestDTO dto) {
        return ResponseEntity.ok(qnaService.updateQna(no, dto));
    }

    // 게시글 삭제
    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteQna(@PathVariable("no") Long no) {
        qnaService.deleteQna(no); // 내부에서 존재 여부 확인 및 삭제 처리
        return ResponseEntity.ok().build();
    }
    
    // 게시글 신고
    @PatchMapping("/{no}/report")
    public ResponseEntity<?> reportQna(@PathVariable("no") Long no) {
        qnaService.reportQna(no);
        return ResponseEntity.ok().build();
    }
    
    // 게시글 복원
    @PatchMapping("/{no}/restore")
    public ResponseEntity<?> restoreQna(@PathVariable("no") Long no) {
    	System.out.println("들어오니");
        qnaService.restoreQna(no);
        return ResponseEntity.ok("복원 완료");
    }
}

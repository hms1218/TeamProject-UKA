package com.teamProject.UKA.customer.qna.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamProject.UKA.customer.qna.dto.QnaCommentRequestDTO;
import com.teamProject.UKA.customer.qna.dto.QnaCommentResponseDTO;
import com.teamProject.UKA.customer.qna.service.QnaCommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer/qna/comment")
@RequiredArgsConstructor
public class QnaCommentController {
    private final QnaCommentService qnaCommentService;

    // 댓글 등록
    @PostMapping
    public ResponseEntity<QnaCommentResponseDTO> createComment(@RequestBody QnaCommentRequestDTO dto) {
        return ResponseEntity.ok(qnaCommentService.createQnaComment(dto));
    }

    // 특정 QnA글의 전체 댓글 조회
    @GetMapping("/{qnaId}")
    public ResponseEntity<List<QnaCommentResponseDTO>> getComments(@PathVariable Long qnaId) {
        return ResponseEntity.ok(qnaCommentService.getCommentsByQnaId(qnaId));
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<QnaCommentResponseDTO> updateComment(
            @PathVariable Long commentId,
            @RequestBody QnaCommentRequestDTO dto
    ) {
        return ResponseEntity.ok(qnaCommentService.updateQnaComment(commentId, dto));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        qnaCommentService.deleteQnaComment(commentId);
        return ResponseEntity.noContent().build();
    }
}

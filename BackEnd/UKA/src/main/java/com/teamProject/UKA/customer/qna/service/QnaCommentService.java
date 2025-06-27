package com.teamProject.UKA.customer.qna.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamProject.UKA.customer.qna.dto.QnaCommentRequestDTO;
import com.teamProject.UKA.customer.qna.dto.QnaCommentResponseDTO;
import com.teamProject.UKA.customer.qna.entity.QnaCommentEntity;
import com.teamProject.UKA.customer.qna.repository.QnaCommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnaCommentService {

    private final QnaCommentRepository qnaCommentRepository;

    // 댓글 등록
    @Transactional
    public QnaCommentResponseDTO createQnaComment(QnaCommentRequestDTO dto) {
        Integer lastNo = qnaCommentRepository.findMaxNoByQnaId(dto.getQnaId());  // ← 여기!
        int nextNo = lastNo != null ? lastNo + 1 : 1;
        QnaCommentEntity comment = QnaCommentEntity.builder()
                .qnaId(dto.getQnaId())
                .qnaCommentNo(nextNo) // QnA별 일련번호
                .qnaCommentWriter(dto.getQnaCommentWriter())
                .qnaCommentContent(dto.getQnaCommentContent())
                .build();
        QnaCommentEntity saved = qnaCommentRepository.save(comment);
        return QnaCommentResponseDTO.fromEntity(saved);
    }

    // 댓글 목록
    @Transactional(readOnly = true)
    public List<QnaCommentResponseDTO> getCommentsByQnaId(Long qnaId) {
        return qnaCommentRepository.findByQnaId(qnaId).stream()
                .map(QnaCommentResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public QnaCommentResponseDTO updateQnaComment(Long qnaCommentId, QnaCommentRequestDTO dto) {
        QnaCommentEntity comment = qnaCommentRepository.findById(qnaCommentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

        if (dto.getQnaCommentContent() != null)
            comment.setQnaCommentContent(dto.getQnaCommentContent());

        if (dto.getQnaCommentWriter() != null)
            comment.setQnaCommentWriter(dto.getQnaCommentWriter());

        // 저장
        QnaCommentEntity updated = qnaCommentRepository.save(comment);

        return QnaCommentResponseDTO.fromEntity(updated);
    }

    // 댓글 삭제
    @Transactional
    public void deleteQnaComment(Long commentId) {
        qnaCommentRepository.deleteById(commentId);
    }
}

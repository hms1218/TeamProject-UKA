package com.teamProject.UKA.customer.qna.dto;

import java.time.LocalDateTime;

import com.teamProject.UKA.customer.qna.entity.QnaEntity;

import lombok.Data;

@Data
public class QnaResponseDTO {
    private Long qnaId;
    private Long qnaNo;
    private String qnaTitle;
    private String qnaContent;
    private String qnaWriter;
    private String qnaIsSecret;
    private String qnaPassword;
    private String qnaIsReported;
    private String qnaIsAnswered;
    private String qnaAnswer;
    private String qnaAnswerWriter;
    private LocalDateTime qnaCreatedAt;
    private LocalDateTime qnaUpdatedAt;
    private Integer qnaReportCount;

    public static QnaResponseDTO fromEntity(QnaEntity entity) {
        QnaResponseDTO dto = new QnaResponseDTO();
        dto.setQnaId(entity.getQnaId());
        dto.setQnaNo(entity.getQnaNo());
        dto.setQnaTitle(entity.getQnaTitle());
        dto.setQnaContent(entity.getQnaContent());
        dto.setQnaWriter(entity.getQnaWriter());
        dto.setQnaIsSecret(entity.getQnaIsSecret());
        dto.setQnaPassword(entity.getQnaPassword());
        dto.setQnaIsReported(entity.getQnaIsReported());
        dto.setQnaIsAnswered(entity.getQnaIsAnswered());
        dto.setQnaAnswer(entity.getQnaAnswer());
        dto.setQnaAnswerWriter(entity.getQnaAnswerWriter());
        dto.setQnaCreatedAt(entity.getQnaCreatedAt());
        dto.setQnaUpdatedAt(entity.getQnaUpdatedAt());
        dto.setQnaReportCount(entity.getQnaReportCount());
        return dto;
    }
}

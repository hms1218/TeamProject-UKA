package com.teamProject.UKA.customer.qna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamProject.UKA.customer.qna.entity.QnaCommentEntity;

public interface QnaCommentRepository extends JpaRepository<QnaCommentEntity, Long> {
    // 특정 QnA 글의 댓글 중 최대 일련번호(뒷자리) 구하기
    @Query("SELECT MAX(c.qnaCommentNo) FROM QnaCommentEntity c WHERE c.qnaId = :qnaId")
    Integer findMaxNoByQnaId(@org.springframework.data.repository.query.Param("qnaId") Long qnaId);

    // QnA글에 달린 모든 댓글 조회
    List<QnaCommentEntity> findByQnaId(Long qnaId);
}

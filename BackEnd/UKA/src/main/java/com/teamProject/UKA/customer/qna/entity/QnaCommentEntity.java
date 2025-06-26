package com.teamProject.UKA.customer.qna.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "qna_comment")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnaCommentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "qna_comment_id")
    private Long qnaCommentId;               // 댓글 PK (auto_increment or 직접 생성)
	
    @Column(name = "qna_id")
    private Long qnaId;                      // QnA FK
    
    @Column(name = "qna_comment_no")
    private Integer qnaCommentNo;            // QnA 내 댓글 순번 (1,2,3...)
    
    @Column(name = "qna_comment_writer", length = 50)
    private String qnaCommentWriter;
    
    @Column(name = "qna_comment_content", columnDefinition = "TEXT")
    private String qnaCommentContent;
    
    @Column(name = "qna_comment_is_secret", length = 1, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String qnaCommentIsSecret;
    
    @Column(name = "qna_comment_is_reported", length = 1, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String qnaCommentIsReported;     // 'Y'/'N'
    
    @Column(name = "qna_comment_created_at", updatable = false)
    private LocalDateTime qnaCommentCreatedAt;
    
    @Column(name = "qna_comment_updated_at")
    private LocalDateTime qnaCommentUpdatedAt;

    @PrePersist
    protected void onCreate() {
	    this.qnaCommentCreatedAt = LocalDateTime.now();
	    this.qnaCommentUpdatedAt = LocalDateTime.now();
	    if (this.qnaCommentIsSecret == null) this.qnaCommentIsSecret = "N";
	    if (this.qnaCommentIsReported == null) this.qnaCommentIsReported = "N";
	}

	@PreUpdate
	protected void onUpdate() {
	    this.qnaCommentUpdatedAt = LocalDateTime.now();
	}
}

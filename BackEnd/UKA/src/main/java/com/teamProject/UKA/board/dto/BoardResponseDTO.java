package com.teamProject.UKA.board.dto;

import java.time.LocalDateTime;

import com.teamProject.UKA.board.model.Board;
import com.teamProject.UKA.board.model.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardResponseDTO {

	private String id;
	private Category category;
	private String title;
	private String author;
	private int view;
	private int likes;
	private int comment;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	//entity -> dto
	public BoardResponseDTO(Board entity) {
        this.id = entity.getId();
        this.category = entity.getCategory();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.view = entity.getView();
        this.likes = entity.getLikes();
        this.comment = entity.getComment();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
	
}

package com.teamProject.UKA.board.dto;

import com.teamProject.UKA.board.model.Board;
import com.teamProject.UKA.board.model.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardRequestDTO {

	private Category category;
    private String title;
    private String author;

    // 생성자(Entity → DTO 변환), 필요하면 추가 가능
    public BoardRequestDTO(Board entity) {
        this.category = entity.getCategory();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
    }

    // DTO → Entity 변환
    public Board toEntity(String generatedId) {
        Board board = new Board();
        board.setId(generatedId);
        board.setCategory(this.category);
        board.setTitle(this.title);
        board.setAuthor(this.author);
        // view, likes, comment, createdAt 등은 엔티티 내부에서 자동 처리
        return board;
    }
}

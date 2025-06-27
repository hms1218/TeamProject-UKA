package com.teamProject.UKA.auth.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
	private String user_id;
	  
	@Column(nullable = false) 
	private String nickname;
	  
	@Column(nullable = false, unique = true) 
	private String email;
	  
	@Column(nullable = false) 
	private String passwordHash;
	   
	private LocalDateTime createdAt = LocalDateTime.now();
}

package com.teamProject.UKA.request.model;


import com.teamProject.UKA.request.dto.RequestDataDTO;

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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "request")
public class RequestDataEntity { 
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;

	@Column(name = "find")
	private boolean find;

	@Column(name = "img")
	private String img;

	@Column(name = "kind")
	private String kind;

	@Column(name = "sex")
	private boolean sex;

	@Column(name = "age")
	private String age;

	@Column(name = "name")
	private String name;

	@Column(name = "time")
	private String time;

	@Column(name = "lost_location")
	private String lostLocation;

	@Column(name = "contact_number")
	private String contactNumber;

	@Column(name = "detail")
	private String detail;
	
	//toDTO
	public RequestDataDTO toDTO() {
		return RequestDataDTO.builder()
				.no(no)
				.find(find)
				
				.img(img)
				.kind(kind) 
				.sex(sex)
				.age(age)
				.name(name)
				
				.time(time)
				.lostLocation(lostLocation)
				.contactNumber(contactNumber)
				.detail(detail)
				.build();
	}

}

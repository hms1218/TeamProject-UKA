package com.teamProject.UKA.request.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamProject.UKA.request.dto.RequestDataDTO;
import com.teamProject.UKA.request.service.RequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/request")
public class RequestController {
	
	@Autowired final private RequestService service;
	
	//C - 찾고 있어요 '단건' 작성.
	@PostMapping
	public ResponseEntity<?> write(@RequestBody RequestDataDTO dto){
		List<RequestDataDTO> result = service.write(dto);
		return ResponseEntity.ok().body(result);
	}
	
//			//C-A - 찾고 있어요. 테스용 데이터 넣기 '많이' 작성.
//			@PostMapping("/all")
//			public ResponseEntity<?> writeAll(@RequestBody List<RequestDataDTO> list){
//				List<RequestDataDTO> result = service.writeAll(list);
//				return ResponseEntity.ok().body(result);
//			}
		
	@GetMapping
	//R - 전체 조회.
	public ResponseEntity<?> findAll(){
		List<RequestDataDTO> result = service.findAll();
		return ResponseEntity.ok().body(result);
	}
	
	//U
	@PutMapping
	public ResponseEntity<?> update(@RequestBody RequestDataDTO dto){
		List<RequestDataDTO> result = service.update(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//D
	@DeleteMapping("/{no}")
	public ResponseEntity<?> delete(@PathVariable(name = "no") int no){
		List<RequestDataDTO> result = service.delete(no);
		return ResponseEntity.ok().body(result);
	}
}

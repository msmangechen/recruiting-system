package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Interview;
import com.mercury.SpringBootRESTDemo.dao.InterviewDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.InterviewService;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

	@Autowired
	InterviewDao interviewDao;
	
	@Autowired
	InterviewService interviewService;
	
	@GetMapping
	public List<Interview> getInterviews() {
		return interviewService.findAllInterviews();
	}
	
	@GetMapping("/{id}")
	public Interview getInterviewById(@PathVariable Long id) {
		return interviewService.findInterviewUsingId(id);
	}
	
	@PostMapping
	public Response postInterview(@Valid @RequestBody Interview interview) {
		return interviewService.saveInterview(interview);
	}
	
	@PutMapping("/{id}")
	public boolean putInterview(@PathVariable Long id, @RequestBody Interview interview) {
		interviewService.updateInterview(id, interview);
		return true;
	}
	
	@DeleteMapping("/{id}")
	public Response deleteInterview(@PathVariable Long id) {
		return interviewService.deleteInterview(id);
	}
	
}

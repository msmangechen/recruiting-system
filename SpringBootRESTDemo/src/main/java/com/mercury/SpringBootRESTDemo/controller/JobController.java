package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Job;
import com.mercury.SpringBootRESTDemo.dao.JobDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.JobService;

@RestController
public class JobController {

	@Autowired
	JobDao jobDao;
	
	@Autowired
	JobService jobService;
	
	@GetMapping("/jobs")
	public List<Job> getJobs() {
		return jobService.findAllJobs();
	}
	
	@GetMapping("/jobs/{id}")
	public Job getJob(@PathVariable Long id) {
		return jobService.findJobUsingId(id);
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PostMapping("/jobs")
	public Response postCandidate(@Valid @RequestBody Job job) {
		return jobService.saveJob(job);
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PutMapping("/jobs/{id}")
	public boolean putJob(@PathVariable Long id, @RequestBody Job job) {
		jobService.updateJob(id, job);
		return true;
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@DeleteMapping("/jobs/{id}")
	public Response deleteJob(@PathVariable Long id) {
		return jobService.deleteJob(id);
	}
}

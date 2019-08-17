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

import com.mercury.SpringBootRESTDemo.bean.Candidate;
import com.mercury.SpringBootRESTDemo.dao.CandidateDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.CandidateService;

@RestController
public class CandidateController {

	@Autowired
	CandidateDao candidateDao;
	
	@Autowired
	CandidateService candidateService;

//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping("/candidates")
	public List<Candidate> getCandidates() {
		return candidateService.findAllCandidates();
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@GetMapping("/candidates/{id}")
	public Candidate getCandidate(@PathVariable Long id) {
		return candidateService.findCandidateUsingId(id);
	}

//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PostMapping("/candidates")
	public Response postCandidate(@Valid @RequestBody Candidate candidate) {
		return candidateService.saveCandidate(candidate);
	}

//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PutMapping("/candidates/{id}")
	public boolean putCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
		candidateService.updateCandidate(id, candidate);
		return true;
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@DeleteMapping("/candidates/{id}")
	public Response deleteCandidate(@PathVariable Long id) {
		return candidateService.deleteCandidate(id);
	}
	
}

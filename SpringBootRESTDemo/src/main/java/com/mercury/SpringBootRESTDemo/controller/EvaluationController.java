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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Evaluation;
import com.mercury.SpringBootRESTDemo.dao.EvaluationDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.EvaluationService;

@RestController
@RequestMapping("/evaluations")
public class EvaluationController {

	@Autowired
	EvaluationDao evaluationDao;
	
	@Autowired
	EvaluationService evaluationService;
	
	@GetMapping
	public List<Evaluation> getEvaluations() {
		return evaluationService.findAllEvaluations();
	}
	
	@GetMapping("/{id}")
	public Evaluation getEvaluationById(@PathVariable Long id) {
		return evaluationService.findEvaluationUsingId(id);
	}
	
	@PostMapping
	public Response postEvaluation(@Valid @RequestBody Evaluation evaluation) {
		return evaluationService.saveEvaluation(evaluation);
	}
	
	@PutMapping("/{id}")
	public boolean putEvaluation(@PathVariable Long id, @RequestBody Evaluation evaluation) {
		evaluationService.updateEvaluation(id, evaluation);
		return true;
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public Response deleteEvaluation(@PathVariable Long id) {
		return evaluationService.deleteEvaluation(id);
	}
	
}

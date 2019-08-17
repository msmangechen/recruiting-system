package com.mercury.SpringBootRESTDemo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Evaluation;
import com.mercury.SpringBootRESTDemo.dao.EvaluationDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class EvaluationService {
	private final Logger LOGGER = LoggerFactory.getLogger(EvaluationService.class);

	@Autowired
	EvaluationDao evaluationDao;
	
	public List<Evaluation> findAllEvaluations() {
		return evaluationDao.findAll();
	}
	
	public Evaluation findEvaluationUsingId(Long id) {
		return evaluationDao.findById(id).get();
	}

	public void addEvaluation(Evaluation evaluation) {
		evaluationDao.save(evaluation);
	}
	
	public Response saveEvaluation(Evaluation evaluation) {
		try {
			evaluationDao.save(evaluation);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false);
		}
	}
	
	public Response deleteEvaluation(Long id) {
		try {
			evaluationDao.deleteById(id);
			return new Response(true);
		} catch (Exception e) {
			return new Response(false);
		} 
	}
	
	public void updateEvaluation(Long id, Evaluation evaluation) {
		Optional<Evaluation> oldOptional = evaluationDao.findById(id);
		if (oldOptional.isPresent()) {
			Evaluation old = oldOptional.get();
			old.setCandidate(evaluation.getCandidate());
			old.setJob(evaluation.getJob());
			old.setEval_time(evaluation.getEval_time());
			old.setStatus(evaluation.getStatus());
			evaluationDao.save(old);
		}
	}
	
}
